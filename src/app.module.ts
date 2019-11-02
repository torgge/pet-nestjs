import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackofficeModule } from './backoffice/backoffice.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://petshop:ervamate@cluster0-rnfue.mongodb.net/petshop?retryWrites=true&w=majority',
      { useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
              },
    ),
    BackofficeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
