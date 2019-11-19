import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Address } from '../models/address.model';
import { Model } from 'mongoose';
import { Pet } from '../models/pet.model';
import { Customer } from '../models/customer.model';

@Injectable()
export class PetService {
  constructor(@InjectModel('Customer')
              private readonly model: Model<Address>) {
  }

  async create(document: string, data: Pet): Promise<Customer> {
    // se buscar e não existir ele cria, senão atualia e atribui um novo id;
    const options = { upsite: true, new: true };
    return await this.model.findOneAndUpdate({ document }, {
      $push: {
        pets: data,
      },
    }, options);
  }

  async update(document: string, id: string, data: Pet): Promise<Customer> {
    const options = { useFindAndModify: false };
    return await this.model.findOneAndUpdate({ document, 'pets._id': id },
      {
        $set: {
          'pets.$': data,
        },
      }, options);
  }

}
