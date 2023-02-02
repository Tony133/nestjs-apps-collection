import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { OrganizationsModule } from './../../src/organizations/organizations.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('[Feature] Organizations - /organizations (e2e)', () => {
  let app: INestApplication;

  const createOrganizationDto = {
    name: 'name #1',
    address: 'address #1',
    description: 'description #1',
    customers: '6117cb11889cdebef449d776',  
  };

  const updateOrganizationDto = {
    name: 'name update',
    address: 'address update',
    description: 'description update',
    customers: ['6117cb11889cdebef449d776']  
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRootAsync({
            useFactory: () => ({
              uri: 'mongodb://127.0.0.1:27017/test',
              useNewUrlParser: true,
              useFindAndModify: false,
              useCreateIndex: true
            }),
        }),        
        OrganizationsModule
    ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/organizations (GET)', () => {
    return request(app.getHttpServer())
      .get('/organizations')
      .expect(200)
  });

  it('Create [POST /organizations]', async () => {
    return request(app.getHttpServer())
      .post('/customers')
      .send(createOrganizationDto)
      .then(({ body }) => {
        expect(body).toEqual(createOrganizationDto);
      });
  });

  it('Get all [GET /organizations]', async () => {
    return await request(app.getHttpServer())
      .get('/customers')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Get one [GET /organizations/:id]', async () => {
    return await request(app.getHttpServer())
      .get('/customers/611a80ee47347c2271183ccf')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });  
  });

  it('Update one [PUT /organizations/:id]', () => {
    return request(app.getHttpServer())
      .put('/organizations/611a80ee47347c2271183ccf')
      .send(updateOrganizationDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(updateOrganizationDto);
      });
  });

  it('Delete one [DELETE /organizations/:id]', () => {
    return request(app.getHttpServer())
      .delete('/organizations/611a80ee47347c2271183ccf')
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
