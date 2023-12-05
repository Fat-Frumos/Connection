import {
  DevLoggerService,
  ProdLoggerService
} from '@app/core/services/logger.service';
import {beforeEach, describe, expect, it} from '@jest/globals';

describe('LoggerService', () => {
  describe('DevLoggerService', () => {
    let service: DevLoggerService;

    beforeEach(() => {
      service = new DevLoggerService();
    });

    it('should log a message with [DEV] prefix', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      service.info('test');
      expect(consoleSpy).toHaveBeenCalledWith('[DEV]: test');
    });
  });

  describe('ProdLoggerService', () => {
    let service: ProdLoggerService;

    beforeEach(() => {
      service = new ProdLoggerService();
    });

    it('should log a message with [PROD] prefix', () => {
      const consoleSpy = jest.spyOn(console, 'log');
      service.info('test');
      expect(consoleSpy).toHaveBeenCalledWith('[PROD]: test');
    });
  });
});
