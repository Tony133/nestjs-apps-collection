import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { CustomersModule } from './../../src/customers/customers.module';
import { AppModule } from '../../src/app.module';

const updateCustomerDto = {
  __v: 0,
  _id: '6117cb11889cdebef449d776',
  firstName: 'firstName#1',
  lastName: 'lastName#1',
  email: 'example@example.it',
  phone: '1234567890',
  address: 'address #1',
  description: 'description #1',
  organizations: ['611a80ee47347c2271183ccf'],
};

describe('[Feature] Customers - /api/customers (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, CustomersModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');

    await app.init();
  });

  it('Should create a new customers [POST /api/customers]', async () => {
    return request(app.getHttpServer())
      .post('/api/customers')
      .send({
        _id: '6117cb11889cdebef449d776',
        firstName: 'firstName#1',
        lastName: 'lastName#1',
        email: 'example@example.it',
        phone: '1234567890',
        address: 'address #1',
        description: 'description #1',
        organizations: [{ _id: '611a80ee47347c2271183ccf' }],
      })
      .then(({ body }) => {
        expect(body).toEqual({
          customer: {
            __v: 0,
            _id: '6117cb11889cdebef449d776',
            firstName: 'firstName#1',
            lastName: 'lastName#1',
            email: 'example@example.it',
            phone: '1234567890',
            address: 'address #1',
            description: 'description #1',
            organizations: ['611a80ee47347c2271183ccf'],
          },
          message: 'Customer has been created successfully',
        });
        expect(HttpStatus.OK);
      });
  });

  it('Should get all customers [GET /api/customers]', async () => {
    return await request(app.getHttpServer())
      .get('/api/customers')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual([
          {
            __v: 0,
            _id: '6117cb11889cdebef449d776',
            firstName: 'firstName#1',
            lastName: 'lastName#1',
            email: 'example@example.it',
            phone: '1234567890',
            address: 'address #1',
            description: 'description #1',
            organizations: [],
          },
        ]);
      });
  });

  it('Should get a customer [GET /api/customers/:id]', async () => {
    return await request(app.getHttpServer())
      .get('/api/customers/6117cb11889cdebef449d776')
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual({
          __v: 0,
          _id: '6117cb11889cdebef449d776',
          firstName: 'firstName#1',
          lastName: 'lastName#1',
          email: 'example@example.it',
          phone: '1234567890',
          address: 'address #1',
          description: 'description #1',
          organizations: [],
        });
      });
  });

  it('Should update a customer [PUT /api/customers/:id]', () => {
    return request(app.getHttpServer())
      .put('/api/customers/6117cb11889cdebef449d776')
      .send(updateCustomerDto)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual({
          customer: {
            __v: 0,
            _id: '6117cb11889cdebef449d776',
            firstName: 'firstName#1',
            lastName: 'lastName#1',
            email: 'example@example.it',
            phone: '1234567890',
            address: 'address #1',
            description: 'description #1',
            organizations: ['611a80ee47347c2271183ccf'],
          },
          message: 'Customer has been successfully updated',
        });
      });
  });

  it('Should delete a customers [DELETE /api/customers/:id]', () => {
    return request(app.getHttpServer())
      .delete('/api/customers/6117cb11889cdebef449d776')
      .expect(HttpStatus.OK)
      .then(() => {
        return request(app.getHttpServer())
          .get('/api/customers/6117cb11889cdebef449d776')
          .expect(HttpStatus.NOT_FOUND);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
