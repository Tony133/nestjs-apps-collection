import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import request from 'supertest';
import { OrganizationsModule } from './../../src/organizations/organizations.module';
import { AppModule } from '../../src/app.module';

const updateOrganizationDto = {
  __v: 0,
  _id: '611a80ee47347c2271183ccf',
  name: 'name #1',
  address: 'address #1',
  description: 'description #1',
  customers: ['6117cb11889cdebef449d776'],
};

describe('[Feature] Organizations - /api/organizations (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, OrganizationsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');

    await app.init();
  });

  it('Should create a new organization [POST /api/organizations]', async () => {
    return request(app.getHttpServer())
      .post('/api/organizations')
      .send({
        _id: '611a80ee47347c2271183ccf',
        name: 'name #1',
        address: 'address #1',
        description: 'description #1',
        customers: ['6117cb11889cdebef449d776'],
      })
      .then(({ body }) => {
        expect(body).toEqual({
          organization: {
            __v: 0,
            _id: '611a80ee47347c2271183ccf',
            name: 'name #1',
            address: 'address #1',
            description: 'description #1',
            customers: ['6117cb11889cdebef449d776'],
          },
          message: 'Organization has been created successfully',
        });
      });
  });

  it('Should get all organizations [GET /api/organizations]', async () => {
    return await request(app.getHttpServer())
      .get('/api/organizations')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual([
          {
            __v: 0,
            _id: '611a80ee47347c2271183ccf',
            name: 'name #1',
            address: 'address #1',
            description: 'description #1',
            customers: [],
          },
        ]);
      });
  });

  it('Should get a organization [GET /api/organizations/:id]', async () => {
    return await request(app.getHttpServer())
      .get('/api/organizations/611a80ee47347c2271183ccf')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual({
          __v: 0,
          _id: '611a80ee47347c2271183ccf',
          name: 'name #1',
          address: 'address #1',
          description: 'description #1',
          customers: [],
        });
      });
  });

  it('Should update a organization [PUT /api/organizations/:id]', () => {
    return request(app.getHttpServer())
      .put('/api/organizations/611a80ee47347c2271183ccf')
      .send(updateOrganizationDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual({
          organization: {
            __v: 0,
            _id: '611a80ee47347c2271183ccf',
            name: 'name #1',
            address: 'address #1',
            description: 'description #1',
            customers: ['6117cb11889cdebef449d776'],
          },
          message: 'Organization has been successfully updated',
        });
      });
  });

  it('Should delete a organization [DELETE /api/organizations/:id]', () => {
    return request(app.getHttpServer())
      .delete('/api/organizations/611a80ee47347c2271183ccf')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get('/api/organizations/611a80ee47347c2271183ccf')
          .expect(HttpStatus.NOT_FOUND);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
