import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesResolver } from './articles.resolver';
import { ArticlesService } from './articles.service';
import { ArticlesArgs, CreateArticleInput, UpdateArticleInput } from './dto';
import { Article } from './entities/article.entity';

const articlesArgs: ArticlesArgs = {
  offset: 0,
  limit: 25,
};

const oneArticle: Article = {
  id: 1,
  title: 'title #1',
  description: 'deescription #1',
  users: [],
};

const createArticleInput: CreateArticleInput = {
  title: 'title #1',
  description: 'deescription #1',
  users: [],
};

const updateArticleInput: UpdateArticleInput = {
  title: 'title #1',
  description: 'deescription #1',
  users: [],
};

describe('ArticlesResolver', () => {
  let resolver: ArticlesResolver;
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesResolver,
        {
          provide: ArticlesService,
          useFactory: () => ({
            findAll: jest.fn().mockResolvedValue({
              id: '1',
              title: 'title #1',
              description: 'deescription #1',
            }),
            findOne: jest.fn().mockReturnValue(oneArticle),
            create: jest.fn(() => createArticleInput),
            update: jest.fn().mockResolvedValue({
              title: 'title #1',
              description: 'deescription #1',
            }),
            remove: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    resolver = module.get<ArticlesResolver>(ArticlesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call method findAll in ArticlesService', async () => {
      await resolver.findAll(articlesArgs);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw if ArticlesService findAll throws', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(resolver.findAll(articlesArgs)).rejects.toThrow(
        new NotFoundException()
      );
    });
  });

  describe('findOne()', () => {
    it('should call method findOneById in ArticlesService id with correct value', async () => {
      await resolver.findOne(1);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('create()', () => {
    it('should call method create in ArticlesService with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await resolver.create(createArticleInput);
      expect(createSpy).toHaveBeenCalledWith(createArticleInput);
    });
  });

  describe('update()', () => {
    it('should call method update in ArticlesService with correct values', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await resolver.update(1, updateArticleInput);
      expect(updateSpy).toHaveBeenCalledWith(1, updateArticleInput);
    });
  });

  describe('remove()', () => {
    it('should call method remove in ArticlesService with correct value', async () => {
      const deleteSpy = jest.spyOn(service, 'remove');
      await resolver.remove(1);
      expect(deleteSpy).toHaveBeenCalledWith(1);
    });
  });
});
