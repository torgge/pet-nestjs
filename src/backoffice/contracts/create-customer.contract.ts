import { Contract } from './contract';
import { Customer } from '../models/customer.model';
import { FluentValidator } from '../../utils/fluent-validator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateCustomerContract implements Contract {
  errors: any[];

  validate(model: Customer): boolean {
    const flunt = new FluentValidator();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');
    flunt.isEmail(model.email, 'E-mail inválido');
    flunt.isFixedLen(model.document, 11, 'CPF inválido');

    this.errors = flunt.errors;
    return flunt.isValid();
  }

}
