import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from './schemas/customer.schema';
import { UserSchema } from './schemas/user.schema';
import { CustomerController } from './controller/customer.controller';
import { AddressController } from './controller/address.controller';
import { PetController } from './controller/pet.controller';
import { AccountController } from './controller/account.controller';
import { AccountService } from './services/account.service';
import { CustomerService } from './services/customer.service';
import { AddressService } from './services/address.service';
import { PetService } from './services/pet.service';
import { JwtStrategy } from '../../shared/strategies/jwt.strategy';
import { AuthService } from '../../shared/services/auth.service';

@Module({
  imports: [
    HttpModule,
    CacheModule.register(),
    PassportModule.register({ defaultStrategy: `jwt` }),
    JwtModule.register({
      secretOrPrivateKey: `Ervamate@00`,
      signOptions: {
        expiresIn: 3600,
      },
    }),
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
  controllers: [
    CustomerController,
    AddressController,
    PetController,
    AccountController,
  ],
  providers: [
    AccountService,
    CustomerService,
    AddressService,
    PetService,
    JwtStrategy,
    AuthService,
  ],
})
export class BackofficeModule {}
