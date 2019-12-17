import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Address } from '../models/address.model';
import { Customer } from '../models/customer.model';
import { Model } from 'mongoose';
import { AddressType } from '../enums/address-type.enum';

@Injectable()
export class AddressService {
  constructor(
    @InjectModel('Customer') private readonly model: Model<Address>,
    private readonly httpService: HttpService) {
  }

  async create(
    document: string,
    data: Address,
    type: AddressType,
  ): Promise<Customer> {
    const options = { upsite: true };
    return type === AddressType.Billing
      ? await this.model.findOneAndUpdate(
        { document },
        {
          $set: {
            billingAddress: data,
          },
        },
        options,
      )
      : await this.model.findOneAndUpdate(
        { document },
        {
          $set: {
            shippingAddress: data,
          },
        },
        options,
      );
  }

  getAddressByZipCode(zipcode: string) {
    const url = `https://viacep.com.br/ws/${zipcode}/json/`;
    return this.httpService.get(url);
  }
}
