import { Test, TestingModule } from '@nestjs/testing';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';

describe('AppResolver', () => {
  let appResolver: AppResolver;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, AppResolver],
    }).compile();

    appResolver = app.get<AppResolver>(AppResolver);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should call method getHello() in AppService', () => {
      const spy = jest.spyOn(appService, 'getHello');

      appResolver.getHello();
      expect(spy).toHaveBeenCalled();
    });
  });
});
