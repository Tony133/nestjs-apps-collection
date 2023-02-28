import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './../src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

const gql = '/graphql';

describe('AppController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('should return message "Hello World!" (GET)', () => {
    return app
      .inject({
        method: 'POST',
        url: gql,
        payload: {
          query: '{ hello }',
        },
      })
      .then(({ payload, statusCode }) => {
        expect(payload).toEqual('{"data":{"hello":"Hello World!"}}');
        expect(statusCode).toBe(200);
      });
  });
});
