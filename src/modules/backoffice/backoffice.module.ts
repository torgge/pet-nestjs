import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from './controller/customer.controller';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { AddressService } from './services/address.service';
import { PetService } from './services/pet.service';
import { AddressController } from './controller/address.controller';
import { PetController } from './controller/pet.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: `Customer`,
        schema: CustomerSchema,
      },
      {
        name: `User`,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [CustomerController,
                AddressController,
                PetController],
  providers: [
    AccountService,
    CustomerService,
    AddressService,
    PetService],
})
export class BackofficeModule {
}
