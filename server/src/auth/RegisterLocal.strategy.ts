import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthsService } from '.';

@Injectable()
export class RegisterLocalStrategy extends PassportStrategy(
  Strategy,
  'register.local',
) {
  constructor(private authsService: AuthsService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const account = await this.authsService.validateRegister(
      username,
      password,
    );
    if (!account) {
      throw new UnauthorizedException('Account already exists !');
    }
    return account;
  }
}
