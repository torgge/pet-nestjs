import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseInterceptors } from '@nestjs/common';
import { AddressService } from '../services/address.service';
import { ValidatorInterceptor } from '../../../interceptors/validator.interceptor';
import { CreateAddressContract } from '../contracts/address/create-address.contract';
import { Address } from '../models/address.model';
import { AddressType } from '../enums/address-type.enum';
import { Result } from '../models/result.model';
import { ResultDto } from '../dtos/result.dto';

@Controller('v1/addresses')
export class AddressController {
  constructor(private readonly addressService: AddressService) {
  }

  @Post(':document/billing')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addBillingAddress(@Param('document') document, @Body() model: Address) {
    try {
      const customer = await this.addressService.create(
        document,
        model,
        AddressType.Billing,
      );
      return new Result(
        `Endereço de cobrança atualiado/inserido com sucesso!`,
        true,
        customer,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new Result(
          `Endereço cobrança não pode ser inserido/alterado`,
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post(':document/shipping')
  @UseInterceptors(new ValidatorInterceptor(new CreateAddressContract()))
  async addShippingAddress(
    @Param('document') document,
    @Body() model: Address,
  ) {
    try {
      const customer = await this.addressService.create(
        document,
        model,
        AddressType.Shipping,
      );
      return new Result(
        `Endereço de entrega atualiado/inserido com sucesso!`,
        true,
        customer,
        null,
      );
    } catch (error) {
      throw new HttpException(
        new Result(
          `Endereço de entrega não pode ser inserido/alterado`,
          false,
          null,
          error,
        ),
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(`search/:zipcode`)
  async search(@Param(`zipcode`) zipcode) {
    try {
      const response = await this.addressService.getAddressByZipCode(zipcode).toPromise();
      return new ResultDto(null, true, response.data, null);
    } catch (error) {
      throw new HttpException(new ResultDto('Não foi possivel localizar seu endereço', false, null, error), HttpStatus.BAD_REQUEST);
    }
  }
}
