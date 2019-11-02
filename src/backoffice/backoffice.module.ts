import { Module } from '@nestjs/common';
import { CustomerController } from './controller/customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { AccountService } from './service/account.service';
import { CustomerService } from './service/customer.service';

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
  controllers: [CustomerController],
  providers: [AccountService, CustomerService],
})
export class BackofficeModule {}
