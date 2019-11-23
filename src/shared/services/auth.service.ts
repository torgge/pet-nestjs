import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AccountService } from '../../modules/backoffice/services/account.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';


@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken() {
    const user: JwtPayload = {
      username: `teste@gmail.com`,
      document: `document`,
      email: `email`,
      image: `noimage`,
      roles: [`admin`],
    };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn: 3600,
      accessToken,
    };
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.accountService.findOneByUsername(payload.username);
    // return payload;
  }
}
