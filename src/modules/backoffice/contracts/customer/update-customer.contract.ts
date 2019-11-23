import { Contract } from '../contract';
import { FluentValidator } from '../../../../utils/fluent-validator';
import { Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from '../../dtos/update-customer.dto';

@Injectable()
export class UpdateCustomerContract implements Contract {
  errors: any[];

  validate(model: UpdateCustomerDto): boolean {
    const flunt = new FluentValidator();

    flunt.hasMinLen(model.name, 5, 'Nome inválido');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
