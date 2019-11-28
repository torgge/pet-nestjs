import { Controller, Get, UseGuards, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../../shared/services/auth.service';

@Controller(`v1/accounts`)
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async CreateToken(): Promise<any> {
    return await this.authService.createToken();
  }

  @Get(``)
  @UseGuards(AuthGuard())
  findAll() {
    return [];
  }
}
