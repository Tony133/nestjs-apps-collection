import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';

const users = {
  users: [
    {
      id: '1',
      name: 'name#1',
      email: 'test@example.com',
      username: 'username#1',
      password: 'secret123',
    },
  ],
};

const user = {
  user: {
    id: '1',
    name: 'name#1',
    email: 'test@example.com',
    username: 'username#1',
    password: 'secret123',
  },
};

const createUser = {
  createUser: {
    name: 'name#1',
    email: 'test@example.com',
    username: 'username#1',
    password: 'secret123',
    roles: [
      {
        name: 'ADMIN',
      },
    ],
  },
};

const updateUser = {
  updateUser: {
    name: 'name#1 update',
    email: 'test@example.com',
    username: 'username#1',
    password: 'secret123',
    roles: [
      {
        name: 'ADMIN',
      },
    ],
  },
};

const deleteUser = {
  removeUser: {
    name: 'name#1 update',
    email: 'test@example.com',
    username: 'username#1',
    password: 'secret123',
  },
};

const gql = '/graphql';

describe('Users [Graphql] (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new users', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'mutation { \
            createUser(createUserInput: { \
                name: "name#1" \
                email:"test@example.com" \
                username: "username#1" \
                password: "secret123" \
                roles: ["ADMIN"] \
            }) { \
                name \
                email \
                username \
                password \
                roles { \
                    name \
                } \
            } \
          }',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(createUser);
      });
    // // chain another request to see our original one works as expected
    // .then(() =>
    //   request(app.getHttpServer())
    //     .post(gql)
    //     .send({ query: '{ users { id name email username password }}' })
    //     .expect(200)
    //     .expect((res) => {
    //       expect(res.body.data).toEqual(users);
    //     })
    // )
  });

  it('should get the users array', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({ query: '{ users { id name email username password }}' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(users);
      });
  });

  it('should get a user by id', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({ query: '{ user (id: 1) { id name email username password }}' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(user);
      });
  });

  it('should update a user by id', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'mutation { \
            updateUser (id: 1,updateUserInput: {\
                name: "name#1 update", \
                email: "test@example.com", \
                username: "username#1", \
                password:"secret123" \
                roles: ["ADMIN"]\
            }) { \
                name \
                username \
                email \
                password \
                roles { \
                    name \
                } \
            }}',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(updateUser);
      });
  });

  it('should delete a user by id', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'mutation { removeUser (id: 1) { name email username password }}',
      })
      .expect((res) => {
        expect(res.body.data).toEqual(deleteUser);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
