import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // tslint:disable-next-line: no-console
  console.warn(`mongo-connection: ${process.env.MONGO_CONNECTION}`);
  console.warn(`mysql-connection: ${process.env.MYSQL_CONNECTION}`);
  console.warn(`api-port: ${process.env.API_PORT}`);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.API_PORT);
}
bootstrap();
