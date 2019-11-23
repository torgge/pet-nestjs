import { Injectable } from '@nestjs/common';
import { Contract } from '../contract';
import { FluentValidator } from '../../../../utils/fluent-validator';
import { CreateCustomerDto } from '../../dtos/create-customer.dto';
import { CreditCard } from '../../models/credit-card.model';

@Injectable()
export class CreateCreditCardContract implements Contract {
  errors: any[];

  validate(model: CreditCard): boolean {
    const flunt = new FluentValidator();

    flunt.hasMinLen(model.holder, 5, `Nome no cartão inválido`);
    flunt.isFixedLen(model.number, 16, `Numero do cartão inválido`);
    flunt.isFixedLen(
      model.expiration,
      4,
      `Data de expiração do cartão inválida`,
    );

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
