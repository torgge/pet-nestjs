import { Controller, Get, UseGuards, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../../../shared/services/auth.service';
import { AuthenticateDto } from '../dtos/account/authenticate.dto';
import { AccountService } from '../services/account.service';
import { ResultDto } from '../dtos/result.dto';

@Controller(`v1/accounts`)
export class AccountController {
  
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService) {}

      // Autenticar
      @Post('authenticate')
      async authenticate(@Body() model: AuthenticateDto): Promise<any> {
          const customer = await this.accountService.authenticate(model.username, model.password);
  
          // Caso não encontre o usuário
          if (!customer)
              throw new HttpException(new ResultDto('Usuário ou senha inválidos', false, null, null), HttpStatus.UNAUTHORIZED);
  
          // Caso o usuário esteja inativo
          if (!customer.user.active)
              throw new HttpException(new ResultDto('Usuário inativo', false, null, null), HttpStatus.UNAUTHORIZED);
  
          // Gera o token
          const token = await this.authService.createToken(customer.document, customer.email, '', customer.user.roles);
          return new ResultDto(null, true, {
            name: customer.name,
            document: customer.document,
            email: customer.email,
            token: token
          }, null);
      }
}
