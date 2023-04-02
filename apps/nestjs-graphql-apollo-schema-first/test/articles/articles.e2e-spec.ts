import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

const articles = {
  articles: [
    {
      id: '1',
      title: 'title#1',
      description: 'description#1',
    },
  ],
};

const article = {
  article: {
    id: '1',
    title: 'title#1',
    description: 'description#1',
  },
};

const createArticle = {
  createArticle: {
    title: 'title#1',
    description: 'description#1',
  },
};

const updateArticle = {
  updateArticle: {
    title: 'title#1 update',
    description: 'description#1 update',
  },
};

const deleteArticle = {
  removeArticle: {
    title: 'title#1 update',
    description: 'description#1 update',
  },
};

const gql = '/graphql';

describe('Articles [Graphql] (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a new articles', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'mutation { \
            createArticle(createArticleInput: { \
                title: "title#1", \
                description: "description#1" \
                users: [] \
              }) { \
                title \
                description \
              } \
          }',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(createArticle);
      });
  });

  it('should get the articles array', () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({ query: '{ articles { id title description }}' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(articles);
      });
  });

  it('should get a article by id', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({ query: '{ article (id: 1) { id title description }}' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(article);
      });
  });

  it('should update a article by id', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query:
          'mutation { \
            updateArticle (id: 1,updateArticleInput: {\
                title: "title#1 update", \
                description: "description#1 update" \
                users: [] \
            }) { \
                title \
                description \
            }}',
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.data).toEqual(updateArticle);
      });
  });

  it('should delete a article by id', async () => {
    return request(app.getHttpServer())
      .post(gql)
      .send({
        query: 'mutation { removeArticle (id: 1) { title description }}',
      })
      .expect((res) => {
        expect(res.body.data).toEqual(deleteArticle);
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
