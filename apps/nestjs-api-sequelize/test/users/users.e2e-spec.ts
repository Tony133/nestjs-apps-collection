import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';

const user = {
  id: 1,
  name: 'name #1',
  surname: 'surname #1',
  username: 'username #1',
  email: 'test@example.com',
  password: 'pass123',
};

describe('[Feature] Users - /api/users (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');

    await app.init();
  });

  it('should create a new user - [POST /api/users]', async () => {
    return await request(app.getHttpServer())
      .post('/api/users')
      .send(user)
      .then(({ body }) => {
        expect(body).toEqual({
          id: 1,
          name: 'name #1',
          surname: 'surname #1',
          username: 'username #1',
          email: 'test@example.com',
          password: body.password,
          createdAt: body.createdAt,
          updatedAt: body.updatedAt,
        });
        expect(HttpStatus.CREATED);
      });
  });

  it('should get all users - [GET /api/users]', async () => {
    return await request(app.getHttpServer())
      .get('/api/users')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual([
          {
            id: 1,
            name: 'name #1',
            surname: 'surname #1',
            username: 'username #1',
            email: 'test@example.com',
            password: body[0].password,
            createdAt: body[0].createdAt,
            updatedAt: body[0].updatedAt,
            roles: [],
          },
        ]);
      });
  });

  it('should get one user by id - [GET /api/users/:id]', async () => {
    return await request(app.getHttpServer())
      .get('/api/users/1')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual({
          id: 1,
          name: 'name #1',
          surname: 'surname #1',
          username: 'username #1',
          email: 'test@example.com',
          password: body.password,
          createdAt: body.createdAt,
          updatedAt: body.updatedAt,
          roles: [],
        });
      });
  });

  it('should update a user by id - [PUT /api/users/:id]', async () => {
    return await request(app.getHttpServer())
      .put('/api/users/1')
      .send(user)
      .then(({ body }) => {
        expect(body).toEqual([1]);
        expect(HttpStatus.OK);
      });
  });

  it('should delete a user by id [DELETE /api/users/:id]', () => {
    return request(app.getHttpServer())
      .delete('/api/users/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get('/api/users/1')
          .expect(HttpStatus.NOT_FOUND);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
