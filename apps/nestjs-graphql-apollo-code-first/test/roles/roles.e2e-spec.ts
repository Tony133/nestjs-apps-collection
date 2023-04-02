import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';

const roles = {
  findAllRole: [
    {
      id: '1',
      name: 'ADMIN',
    },
  ],
};

const role = {
  findOneRole: {
    id: '1',
    name: 'ADMIN',
  },
};

const createRole = {
  createRole: {
    name: 'ADMIN',
  },
};

const deleteRole = {
  removeRole: {
    name: 'ADMIN',
  },
};

const gql = '/graphql';

describe('Roles [Graphql] (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new roles', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'mutation { \
            createRole(createRoleInput: { \
                name: "ADMIN" \
            }) { \
                name \
            } \
          }',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(createRole);
      });
  });

  it('should get the roles array', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({ query: '{ findAllRole { id name }}' })
      .expect(200)
      .expect((res) => {
        console.log(res.body.data);
        expect(res.body.data).toEqual(roles);
      });
  });

  it('should get a role by id', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({ query: '{ findOneRole (id: "1") { id name }}' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(role);
      });
  });

  it('should delete a role by id', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: 'mutation { removeRole (id: "1") { name }}',
      })
      .expect((res) => {
        expect(res.body.data).toEqual(deleteRole);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
