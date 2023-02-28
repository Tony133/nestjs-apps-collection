import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { HttpStatus } from '@nestjs/common';
import { HashingService } from '../../src/shared/hashing/hashing.service';
import { UsersService } from '../../src/users/users.service';
import { AppModule } from '../../src/app.module';

const gql = '/graphql';

describe('Users [Graphql] (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            users: jest.fn(() => {}),
            user: jest.fn(() => {}),
            createUser: jest.fn(() => {}),
            updateUser: jest.fn(() => {}),
            removeUser: jest.fn(() => {}),
          },
        },
      ],
    })
      .overrideProvider(HashingService)
      .useValue({
        hash: jest.fn(() => 'secret123'),
      })
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('should create a user', async () => {
    return await app
      .inject({
        method: 'POST',
        url: gql,
        payload: {
          query:
            'mutation { \
              createUser(createUserInput: { \
                  name: "name#1" \
                  email:"test@example.com" \
                  username: "username#1" \
                  password: "secret123" \
              }) { \
                  name \
                  email \
                  username \
                  password \
              } \
            }',
        },
      })
      .then(({ payload, statusCode }) => {
        expect(payload).toEqual(
          '{"data":{"createUser":{"name":"name#1","email":"test@example.com","username":"username#1","password":"secret123"}}}'
        );
        expect(statusCode).toEqual(HttpStatus.OK);
      });
  });

  it('should get the users array', async () => {
    return await app
      .inject({
        method: 'POST',
        url: gql,
        payload: {
          query: '{ users { id name email username password } }',
        },
      })
      .then(({ payload, statusCode }) => {
        expect(payload).toEqual(
          '{"data":{"users":[{"id":"1","name":"name#1","email":"test@example.com","username":"username#1","password":"secret123"}]}}'
        );
        expect(statusCode).toEqual(HttpStatus.OK);
      });
  });

  it('should get the single user by id', async () => {
    return await app
      .inject({
        method: 'POST',
        url: gql,
        payload: {
          query: '{ user (id: 1) { id name email username password } }',
        },
      })
      .then(({ payload, statusCode }) => {
        expect(payload).toEqual(
          '{"data":{"user":{"id":"1","name":"name#1","email":"test@example.com","username":"username#1","password":"secret123"}}}'
        );
        expect(statusCode).toEqual(HttpStatus.OK);
      });
  });

  it('should update a user by id', async () => {
    return await app
      .inject({
        method: 'POST',
        url: gql,
        payload: {
          query:
            'mutation {updateUser(updateUserInput: { name: "name#1", email: "test@example.com", username: "username#1", password:"secret123" }, id: 1) { name username email password }}',
        },
      })
      .then(({ payload, statusCode }) => {
        expect(payload).toEqual(
          '{"data":{"updateUser":{"name":"name#1","username":"username#1","email":"test@example.com","password":"secret123"}}}'
        );
        expect(statusCode).toEqual(HttpStatus.OK);
      });
  });

  it('should delete a user by id', async () => {
    return await app
      .inject({
        method: 'POST',
        url: gql,
        payload: {
          query:
            'mutation { removeUser(id: 1) { name email username password } }',
        },
      })
      .then(({ payload, statusCode }) => {
        expect(payload).toEqual(
          '{"data":{"removeUser":{"name":"name#1","email":"test@example.com","username":"username#1","password":"secret123"}}}'
        );
        expect(statusCode).toEqual(HttpStatus.OK);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
