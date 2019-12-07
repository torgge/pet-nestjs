import { Controller, Post, Body, HttpException, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from '../../../shared/services/auth.service';
import { AuthenticateDto } from '../dtos/account/authenticate.dto';
import { AccountService } from '../services/account.service';
import { ResultDto } from '../dtos/result.dto';
import { ResetPasswordDto } from '../dtos/account/reset-password.dto';
import { Guid } from "guid-typescript";
import { JwtAuthGuard } from 'src/shared/guards/auth.guard';
import { ChangePasswordDto } from '../dtos/account/change-password.dto';

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

    // Resetar a senha
    @Post('reset-password')
    async resetPassword(@Body() model: ResetPasswordDto): Promise<any> {
        try {
            // TODO: Enviar E-mail com a senha

            const password = Guid.create().toString().substring(0, 8).replace('-', '');
            await this.accountService.update(model.document, { password: password });
            return new ResultDto('Uma nova senha foi enviada para seu E-mail', true, null, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível restaurar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }

    // Alterar Senha
    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(@Req() request, @Body() model: ChangePasswordDto): Promise<any> {
        try {
            // TODO: Encriptar senha
            await this.accountService.update(request.user.document, { password: model.newPassword });
            return new ResultDto('Sua senha foi alterada com sucesso!', true, null, null);
        } catch (error) {
            throw new HttpException(new ResultDto('Não foi possível alterar sua senha', false, null, error), HttpStatus.BAD_REQUEST);
        }
    }    
}
