import { Injectable } from '@nestjs/common';
import { Contract } from '../contract';
import { FluentValidator } from '../../../../utils/fluent-validator';
import { QueryDto } from '../../dtos/query.dto';

@Injectable()
export class QueryCustomerContract implements Contract {
  errors: any[];

  validate(model: QueryDto): boolean {
    const flunt = new FluentValidator();

    flunt.isGreaterThan(
      model.take,
      1000,
      `Sua query não pode retornar mais que 1000 registros`,
    );
    flunt.hasMinLen(model.skip, 0, 'skip não pode ser vazio');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
