import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ArticlesService } from './articles.service';
import { ArticlesArgs, CreateArticleInput, UpdateArticleInput } from './dto';
import { Article } from './entities/article.entity';

const articleArgs: ArticlesArgs = {
  offset: 0,
  limit: 25,
};

const oneArticle: Article = {
  id: 1,
  title: 'title #1',
  description: 'description #1',
  users: [],
};

const createArticleInput: CreateArticleInput = {
  title: 'title #1',
  description: 'description #1',
  users: [],
};

const updateArticleInput: UpdateArticleInput = {
  title: 'title #1',
  description: 'description #1',
  users: [],
};

const articleArray: Article = {
  id: 1,
  title: 'title #1',
  description: 'description #1',
  users: [],
};

describe('ArticlesService', () => {
  let service: ArticlesService;
  let repositoryArticle: Repository<Article>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getRepositoryToken(Article),
          useValue: {
            find: jest.fn().mockResolvedValue(articleArray),
            findOne: jest.fn().mockReturnValue(oneArticle),
            create: jest.fn().mockResolvedValue(createArticleInput),
            save: jest.fn().mockResolvedValue(createArticleInput),
            update: jest.fn().mockResolvedValue(updateArticleInput),
            preload: jest.fn().mockResolvedValue(updateArticleInput),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            update: jest.fn(),
            preload: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    repositoryArticle = module.get<Repository<Article>>(
      getRepositoryToken(Article)
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of articles', async () => {
      const findSpy = jest.spyOn(service, 'findAll');
      const articles = await service.findAll(articleArgs);
      expect(articles).toEqual(articleArray);
      expect(findSpy).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should get a single article', () => {
      const repoSpy = jest.spyOn(repositoryArticle, 'findOne');
      expect(service.findOne(1)).resolves.toEqual(oneArticle);
      expect(repoSpy).toBeCalledWith({
        where: { id: 1 },
        relations: ['users'],
      });
    });

    it('should return a exception when doesnt find a article by id', async () => {
      const repoSpy = jest
        .spyOn(repositoryArticle, 'findOne')
        .mockReturnValue(null);
      const userNotFound = service.findOne(2);
      expect(userNotFound).rejects.toThrow(NotFoundException);
      expect(repoSpy).toHaveBeenCalledWith({
        where: { id: 2 },
        relations: ['users'],
      });
    });
  });

  describe('create()', () => {
    it('should successfully insert a article', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await service.create(createArticleInput);
      expect(createSpy).toHaveBeenCalledWith(createArticleInput);
    });
  });

  describe('update()', () => {
    it('should update a article', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await service.update(1, updateArticleInput);
      expect(updateSpy).toHaveBeenCalledWith(1, updateArticleInput);
    });

    it('should return a exception when doesnt update a article by id', async () => {
      repositoryArticle.preload = jest.fn().mockReturnValue(null);
      const articleNotFound = service.update(2, {
        title: 'title #1',
        description: 'description #1',
        users: [],
      });
      expect(articleNotFound).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove()', () => {
    it('should return article remove', async () => {
      const deleteSpy = jest.spyOn(service, 'remove');
      await service.remove(1);
      expect(deleteSpy).toBeCalledWith(1);
    });
  });
});
