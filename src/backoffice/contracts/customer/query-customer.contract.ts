import { Injectable } from '@nestjs/common';
import { Contract } from '../contract';
import { Pet } from '../../models/pet.model';
import { FluentValidator } from '../../../utils/fluent-validator';
import { QueryDto } from '../../dtos/query.dto';

@Injectable()
export class QueryCustomerContract implements Contract {
  errors: any[];

  validate(model: QueryDto): boolean {
    const flunt = new FluentValidator();

    flunt.hasMaxLen(model.take, 25, 'Não são permitidos resultados acima de 25 items por request');
    flunt.hasMinLen(model.skip, 0, 'skip não pode ser vaio');

    this.errors = flunt.errors;
    return flunt.isValid();
  }
}
