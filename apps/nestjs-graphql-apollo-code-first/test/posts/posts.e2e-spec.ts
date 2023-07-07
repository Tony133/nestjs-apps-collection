import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../../src/app.module';
import { HashingService } from '../../src/shared/hashing/hashing.service';

const createUser = {
  createUser: {
    name: 'name#2',
    email: 'test@example.com',
    username: 'username#2',
    password: 'secret123',
  },
};

const posts = {
  posts: [
    {
      id: '1',
      title: 'title #1',
      description: 'description #1',
    },
  ],
};

const post = {
  post: {
    id: '1',
    title: 'title #1',
    description: 'description #1',
  },
};

const createPost = {
  createPost: {
    title: 'title #1',
    description: 'description #1',
  },
};

const updatePost = {
  updatePost: {
    title: 'title #1 update',
    description: 'description #1',
  },
};

const deletePost = {
  removePost: {
    title: 'title #1 update',
    description: 'description #1',
  },
};

const gql = '/graphql';

describe('Posts [Graphql] (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HashingService)
      .useValue({
        hash: jest.fn(() => 'secret123'),
      })
      .compile();

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
                        name: "name#2" \
                        email:"test@example.com" \
                        username: "username#2" \
                        password: "secret123" \
                        roles: ["ADMIN"] \
                    }) { \
                        name \
                        email \
                        username \
                        password \
                    } \
                }',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(createUser);
      });
  });

  it('should create a new post', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'mutation { \
                createPost(createPostInput: { \
                    title: "title #1" \
                    description: "description #1" \
                    users: ["name#2"] \
                }) { \
                    title \
                    description \
                } \
              }',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(createPost);
      });
  });

  it('should get the posts array', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({ query: '{ posts { id title description }}' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(posts);
      });
  });

  it('should get a post by id', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({ query: '{ post (id: "1") { id title description }}' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(post);
      });
  });

  it('should update a post by id', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'mutation { \
                updatePost (id: "1",updatePostInput: {\
                    title: "title #1 update" \
                    description: "description #1" \
                    users: ["name#2"] \
                }) { \
                    title \
                    description \
                }}',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(updatePost);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
