import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';

const role = {
  id: 1,
  name: 'ADMIN',
};

describe('[Feature] Roles - /api/roles (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');

    await app.init();
  });

  it('should a new role - [POST /api/roles]', async () => {
    return await request(app.getHttpServer())
      .post('/api/roles')
      .send(role)
      .then(({ body }) => {
        expect(body).toEqual({
          id: 1,
          name: 'ADMIN',
          createdAt: body.createdAt,
          updatedAt: body.updatedAt,
        });
        expect(HttpStatus.CREATED);
      });
  });

  it('should get all roles - [GET /api/roles]', async () => {
    return await request(app.getHttpServer())
      .get('/api/roles')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual([
          {
            id: 1,
            name: 'ADMIN',
            createdAt: body[0].createdAt,
            updatedAt: body[0].updatedAt,
          },
        ]);
      });
  });

  it('should get a role by id - [GET /api/roles/:id]', async () => {
    return await request(app.getHttpServer())
      .get('/api/roles/1')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual({
          id: 1,
          name: 'ADMIN',
          createdAt: body.createdAt,
          updatedAt: body.updatedAt,
        });
      });
  });

  it('should update a role by id - [PUT /api/roles/:id]', async () => {
    return await request(app.getHttpServer())
      .put('/api/roles/1')
      .send(role)
      .then(({ body }) => {
        expect(body).toEqual([1]);
        expect(HttpStatus.OK);
      });
  });

  it('Delete a role by id - [DELETE /api/roles/:id]', () => {
    return request(app.getHttpServer())
      .delete('/api/roles/1')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get('/api/roles/1')
          .expect(HttpStatus.NOT_FOUND);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
