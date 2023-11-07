import {Injectable, isDevMode} from '@angular/core';

abstract class LoggerService {
  abstract info(message: string): void;
}

@Injectable()
export class DevLoggerService extends LoggerService {
  info(message: string) {
    console.log(`[DEV]: ${message}`);
  }
}

@Injectable()
export class ProdLoggerService extends LoggerService {
  info(message: string) {
    console.log(`[PROD]: ${message}`);
  }
}

export const loggerServiceProvider = {
  provide: LoggerService,
  useClass: isDevMode() ? DevLoggerService : ProdLoggerService
};
