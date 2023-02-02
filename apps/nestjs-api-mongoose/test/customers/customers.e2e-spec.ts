import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { CustomersModule } from './../../src/customers/customers.module';
import { MongooseModule } from '@nestjs/mongoose';

describe('[Feature] Customers - /customers (e2e)', () => {
  let app: INestApplication;

  const createCustomerDto = {
    firstName: 'firstName#1',
    lastName: 'lastName#1',
    email: 'example@example.it',
    phone: '1234567890',
    address: 'address #1',
    description: 'description #1',
    organizations: ['611a80ee47347c2271183ccf'],
  };

  const updateCustomerDto = {
    __v: 0,
    _id: '6117cb11889cdebef449d776',
    firstName: 'firstName update',
    lastName: 'lastName update',
    email: 'example@example.it',
    phone: '1234567890',
    address: 'address update',
    description: 'description update',
    organizations: ['611a80ee47347c2271183ccf'],
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
        CustomersModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Create [POST /customers]', async () => {
    return request(app.getHttpServer())
      .post('/customers')
      .send(createCustomerDto)
      .then(({ body }) => {
        expect(body).toEqual(createCustomerDto);
      });
  });

  it('Get all [GET /customers]', async () => {
    return await request(app.getHttpServer())
      .get('/customers')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });
  });

  it('Get one [GET /customers/:id]', async () => {
    return await request(app.getHttpServer())
      .get('/customers/6117cb11889cdebef449d776')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toBeDefined();
      });  
  });

  it('Update one [PUT /customers/:id]', () => {
    return request(app.getHttpServer())
      .put('/customers/6117cb11889cdebef449d776')
      .send(updateCustomerDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(updateCustomerDto);
      });
  });

  it('Delete one [DELETE /customers/:id]', () => {
    return request(app.getHttpServer())
      .delete('/customers/6117cb11889cdebef449d776')
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
