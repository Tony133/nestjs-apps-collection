import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../../nestjs-graphql-mercurius-code-first/src/users/users.service';
import { AppModule } from '../../../nestjs-graphql-mercurius-code-first/src/app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

const users =
  '{"data":\
        {"users": [\
          {"id":"1", "name": "name#1", "username": "username#1", "email":"test1@example.it", "password":"pass123},\
          {"id":"2", "name": "name#2", "username": "username#2", "email":"test2@example.it", "password":"pass123},\
          {"id":"3", "name": "name#3", "username": "username#3", "email":"test3@example.it", "password":"pass123} ]"}}';

const user =
  '{"data":\
{"users": [\
  {"id":"1", "name": "name#1", "username": "username#1", "email":"test1@example.it", "password":"pass123} ]"}}';

const gql = '/graphql';

describe('users [Graphql] (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: UsersService,
          useValue: {
            users: jest.fn(() => users),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('should get the users array', () => {
    return app
      .inject({
        method: 'POST',
        url: gql,
        payload: {
          query: '{ users {id name email username password } }',
        },
      })
      .then(({ payload, statusCode }) => {
        expect(statusCode).toBe(200);
        expect(payload).toEqual(users);
      });
  });

  it('should get the single user', () => {
    return app
      .inject({
        method: 'POST',
        url: gql,
        payload: {
          query: '{ user (id: 1) {id name email username password } }',
        },
      })
      .then(({ payload, statusCode }) => {
        expect(statusCode).toBe(200);
        expect(payload).toEqual(user);
      });
  });

  it('should create a user', () => {
    return app
      .inject({
        method: 'POST',
        url: gql,
        payload: {
          query:
            'mutation {createUser(createUserInput: { name: "tony", email: "tony_admin@nest.it", username: "tony_admin", password:"pass123" }) { name username email, password}}',
        },
      })
      .then(({ payload, statusCode }) => {
        expect(statusCode).toBe(200);
        expect(payload).toEqual(user);
      });
  });

  it('should update a user', () => {
    return app
      .inject({
        method: 'POST',
        url: gql,
        payload: {
          query:
            'mutation {updateUser(updateUserInput: { name: "tony", email: "tony_admin@nest.it", username: "tony_admin", password:"pass123" }, id: 1) { name username email, password}}',
        },
      })
      .then(({ payload, statusCode }) => {
        expect(statusCode).toBe(200);
        expect(payload).toEqual(user);
      });
  });

  it('should delete a user', () => {
    return app
      .inject({
        method: 'POST',
        url: gql,
        payload: {
          query: '{ removeUser (id: 1) {id name email username password } }',
        },
      })
      .then(({ payload, statusCode }) => {
        expect(statusCode).toBe(200);
        expect(payload).toEqual(user);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
