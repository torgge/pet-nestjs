import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  // tslint:disable-next-line:no-console
  log(message: string) {console.log(message);}
  // tslint:disable-next-line:no-console
  error(message: string, trace: string) {console.log(message);}
  // tslint:disable-next-line:no-console
  warn(message: string) { console.log(message); }
  // tslint:disable-next-line:no-console
  debug(message: string) { console.log(message); }
  // tslint:disable-next-line:no-console
  verbose(message: string) { console.log(message); }
}
