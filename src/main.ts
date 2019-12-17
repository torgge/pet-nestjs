import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './shared/services/custom-logger.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as compression from 'compression';

async function bootstrap() {
  // tslint:disable-next-line: no-console
  console.warn(`mongo-connection: ${process.env.MONGO_CONNECTION}`);
  // tslint:disable-next-line: no-console
  console.warn(`mysql-connection: ${process.env.MYSQL_CONNECTION}`);
  // tslint:disable-next-line:no-console
  console.warn(`api-port: ${process.env.API_PORT}`);

  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  // compressao de requisicoes
  app.use(compression());

  // documentacao
  const options = new DocumentBuilder()
    .setTitle(`Petshop API`)
    .setDescription(`API do curso 7180`)
    .setVersion(`1.0.0`)
    .addTag(`petshop`)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`swagger-ui`, app, document);

  await app.listen(process.env.API_PORT);
}

bootstrap();
