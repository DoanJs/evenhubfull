import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as Crypto from 'crypto-js';
import { User } from 'src/users';
import { Repository } from 'typeorm';
import { AccessTokenType } from './types/accessTokenType';
import { Request, Response } from 'express';

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
    const user = await this.userRepository.findOne({
      where: { Username: username },
    });
    if (user) {
      throw new UnauthorizedException('Tài khoản này đã tồn tại!');
    }
    return { username, password };
  }

  async login(req: Request, res: Response): Promise<AccessTokenType> {
    console.log(req.user)
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

    // const refresh_token = this.jwtService.sign(
    //   {
    //     ...payload,
    //     Password: user.Password,
    //   },
    //   {
    //     expiresIn: process.env.expiresInRefreshToken as string,
    //     secret: process.env.SECREREFRESHTOKEN as string,
    //   },
    // );

    // res.cookie(process.env.REFRESHTOKENCOOKIENAME as string, refresh_token, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'lax',
    //   path: '/refresh_token',
    // });

    return {
      access_token,
    };
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

  //   async refresh_token(req: Request, res: Response): Promise<AccessTokenType> {
  //     const refreshToken = req.cookies[process.env.REFRESHTOKENCOOKIENAME];
  //     if (!refreshToken) {
  //       throw new UnauthorizedException('refresh token not exist!');
  //     }

  //     try {
  //       const decodeUser = this.jwtService.verify(refreshToken, {
  //         secret: process.env.SECREREFRESHTOKEN as string,
  //       }) as JwtPayload;

  //       const existingUser = await this.accountRepository.query(
  //         SP_GET_DATA(
  //           'Accounts',
  //           `'Username = N''${decodeUser.Username}'''`,
  //           'AccountID',
  //           0,
  //           0,
  //         ),
  //       );
  //       if (!existingUser[0]) {
  //         throw new UnauthorizedException('Account not exist in Database !');
  //       }

  //       const payload = {
  //         AccountID: existingUser[0].AccountID,
  //         Username: existingUser[0].Username,
  //         Role: existingUser[0].Role,
  //         Position: existingUser[0].Position,
  //       };

  //       const refresh_token = this.jwtService.sign(
  //         {
  //           ...payload,
  //           MaHistory: decodeUser.MaHistory,
  //           Password: existingUser.Password,
  //         },
  //         {
  //           expiresIn: process.env.expiresInRefreshToken as string,
  //           secret: process.env.SECREREFRESHTOKEN as string,
  //         },
  //       );

  //       res.cookie(process.env.REFRESHTOKENCOOKIENAME as string, refresh_token, {
  //         httpOnly: true,
  //         secure: true,
  //         sameSite: 'lax',
  //         path: '/refresh_token',
  //       });

  //       return {
  //         access_token: this.jwtService.sign(
  //           { ...payload, MaHistory: decodeUser.MaHistory },
  //           {
  //             expiresIn: process.env.expiresInToken as string,
  //             secret: process.env.SECRETOKEN as string,
  //           },
  //         ),
  //       };
  //     } catch (error) {
  //       throw new UnauthorizedException('Refresh token not valid!');
  //     }
  //   }

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
