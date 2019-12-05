import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from '../../../shared/services/auth.service';
import { JwtAuthGuard } from '../../../shared/guards/auth.guard';

@Controller(`v1/accounts`)
export class AccountController {
  constructor(private readonly authService: AuthService) {
  }

  @Post()
  async CreateToken(): Promise<any> {
    return await this.authService.createToken();
  }

  @Get(``)
  @UseGuards(JwtAuthGuard)
  findAll(@Req() request) {
    // tslint:disable-next-line:no-console
    console.log(request.user);
    return [];
  }
}
