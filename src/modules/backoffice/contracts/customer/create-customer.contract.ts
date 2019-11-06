import { Contract } from '../contract';
import { FluentValidator } from '../../../../utils/fluent-validator';
import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/create-customer.dto';

@Injectable()
export class CreateCustomerContract implements Contract {
  errors: any[];

  validate(model: CreateCustomerDto): boolean {
    const flunt = new FluentValidator();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');
    flunt.isEmail(model.email, 'E-mail inválido');
    flunt.isFixedLen(model.document, 11, 'CPF inválido');
    flunt.hasMinLen(model.password, 6, 'senha inválida');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
