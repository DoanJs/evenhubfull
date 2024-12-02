import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as Crypto from 'crypto-js';
import { User } from 'src/users';
import { Repository } from 'typeorm';
import { AccessTokenType } from './types/accessTokenType';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateLogin(username: string, password: string): Promise<any> {
    const user = await this.userRepository.query(
      `select * from Users where Email = '${username}'`,
    );
    if (!user[0]) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }
    if (Crypto.SHA512(password).toString() != user[0].Password) {
      throw new UnauthorizedException('Mật khẩu không chính xác!');
    }
    return user[0];
  }

  async validateRegister(username: string, password: string): Promise<any> {
    const user = await this.userRepository.query(
      `select * from Users where Email = '${username}'`,
    );
    if (user) {
      throw new UnauthorizedException('Tài khoản này đã tồn tại!');
    }
    return { username, password };
  }

  async login(req: Request, res: Response): Promise<AccessTokenType> {
    const user = req.user as User;

    const payload = {
      UserID: user.UserID,
      Username: user.Username,
      Email: user.Email,
    };

    const access_token = this.jwtService.sign(payload, {
      expiresIn: process.env.expiresInToken as string,
      secret: process.env.SECRETOKEN as string,
    });

    const refresh_token = this.jwtService.sign(
      {
        ...payload,
        Password: user.Password,
      },
      {
        expiresIn: process.env.expiresInRefreshToken as string,
        secret: process.env.SECREREFRESHTOKEN as string,
      },
    );

    res.cookie(process.env.REFRESHTOKENCOOKIENAME as string, refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/refresh_token',
    });

    return {
      access_token,
      user: { Username: user.Username, Email: user.Email },
    };
  }

  async handleSendMail(val: any, email: string) {
    const verificationCode = Math.round(1000 + Math.random() * 9000);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      // secure: true,
      auth: {
        user: 'quanvujs1990@gmail.com',
        pass: 'nznvpwqonkkfbhnn',
      },
    });
    try {
      await transporter.sendMail({
        from: `Support evenhubfull Application" <${process.env.USERNAME_GMAIL}>`, // sender address
        to: email, // list of receivers
        subject: 'Verification email code', // Subject line
        text: 'Your code to verification email', // plain text body
        html: `<h1>${verificationCode}</h1>`, // html body
      });
      return verificationCode;
    } catch (error) {
      console.log(`Can not send email ${error}`);
    }
  }

  async verification(req: Request) {
    const { email } = req.body;
    const verificationCode = await this.handleSendMail('', email);
    return { code: verificationCode, email };
  }

  async register(req: Request) {
    const { username, password, email } = req.body;

    const hashPassword = Crypto.SHA512(password).toString();
    const newAccount = this.userRepository.create({
      Username: username,
      Password: hashPassword,
      Email: email,
    });
    await this.userRepository.save(newAccount);
    return newAccount;
  }

  async forgotPassword(req: Request) {
    const { email } = req.body;
    const user = await this.userRepository.query(
      `select * from Users where Email = '${email}'`,
    );
    if (user) {
      const newVerificationCode = Math.round(100000 + Math.random() * 99000);
      const newPassword = Crypto.SHA512(`${newVerificationCode}`).toString();
      await this.userRepository.query(
        `update Users set Password = '${newPassword}' where Email = '${email}'`,
      );
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        // secure: true,
        auth: {
          user: process.env.USERNAME_GMAIL,
          pass: process.env.PASSWORD_UD_GMAIL,
        },
      });
      try {
        await transporter.sendMail({
          from: `Support evenhubfull Application" <${process.env.USERNAME_GMAIL}>`, // sender address
          to: email, // list of receivers
          subject: 'New password Application evenhub', // Subject line
          text: 'Your new password to login Evenhub', // plain text body
          html: `<h1>${newVerificationCode}</h1>`, // html body
        });
        return newVerificationCode;
      } catch (error) {
        console.log(`Can not reset your password ${error}`);
      }
    } else {
      throw new UnauthorizedException('Tài khoản này không tồn tại!');
    }
  }

  async refresh_token(req: Request, res: Response): Promise<AccessTokenType> {
    const refreshToken = req.cookies[process.env.REFRESHTOKENCOOKIENAME];
    if (!refreshToken) {
      throw new UnauthorizedException('refresh token not exist!');
    }

    try {
      const decodeUser = this.jwtService.verify(refreshToken, {
        secret: process.env.SECREREFRESHTOKEN as string,
      }) as JwtPayload;

      const existingUser = await this.userRepository.query(
        `select * from Users where Email = '${decodeUser.Email}'`,
      );
      if (!existingUser[0]) {
        throw new UnauthorizedException('User not exist in Database !');
      }

      const payload = {
        UserID: existingUser[0].UserID,
        Username: existingUser[0].Username,
        Email: existingUser[0].Email,
      };

      const refresh_token = this.jwtService.sign(
        {
          ...payload,
          Password: existingUser.Password,
        },
        {
          expiresIn: process.env.expiresInRefreshToken as string,
          secret: process.env.SECREREFRESHTOKEN as string,
        },
      );

      res.cookie(process.env.REFRESHTOKENCOOKIENAME as string, refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/refresh_token',
      });

      return {
        access_token: this.jwtService.sign(payload, {
          expiresIn: process.env.expiresInToken as string,
          secret: process.env.SECRETOKEN as string,
        }),
        user: {
          Username: existingUser[0].Username,
          Email: existingUser[0].Email,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Refresh token not valid!');
    }
  }

  //   async logout(req: any, res: Response): Promise<boolean> {
  //     res.clearCookie(process.env.REFRESHTOKENCOOKIENAME, {
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: 'lax',
  //       path: '/refresh_token',
  //     });

  //     await this.accountRepository.query(
  //       SP_CHANGE_DATA(
  //         `'EDIT'`,
  //         'Histories',
  //         null,
  //         null,
  //         null,
  //         `N' TimeLogout = N''${moment().format()}''
  //         '`,
  //         `'MaHistory = ${req.body?.MaHistory}'`,
  //       ),
  //     );
  //     return true;
  //   }

  //   async getAccountLogin(AccountID: number): Promise<Account> {
  //     const account = await this.accountRepository.query(
  //       SP_GET_DATA('Accounts', `'AccountID = ${AccountID}'`, 'AccountID', 0, 0),
  //     );
  //     return account;
  //   }
}
