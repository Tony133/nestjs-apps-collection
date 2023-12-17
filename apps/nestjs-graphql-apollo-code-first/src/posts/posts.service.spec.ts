import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/users.entity';
import { CreatePostInput, UpdatePostInput, PostsArgs } from './dto';
import { Posts } from './entities/posts.entity';
import { PostsService } from './posts.service';
import { UserInputError } from '@nestjs/apollo';

const postArgs: PostsArgs = {
  offset: 0,
  limit: 25,
};

const onePost: Posts = {
  id: 1,
  title: 'title #1',
  description: 'description #1',
  users: [],
};

const createPostInput: CreatePostInput = {
  title: 'title #1',
  description: 'description #1',
  users: [],
};

const updatePostInput: UpdatePostInput = {
  title: 'title #1',
  description: 'description #1',
  users: [],
};

const postArray: Posts = {
  id: 1,
  title: 'title #1',
  description: 'description #1',
  users: [],
};

describe('PostsService', () => {
  let service: PostsService;
  let repositoryPost: Repository<Posts>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Posts),
          useValue: {
            find: jest.fn().mockResolvedValue(postArray),
            findOne: jest.fn().mockReturnValue(onePost),
            create: jest.fn().mockResolvedValue(createPostInput),
            save: jest.fn().mockResolvedValue(createPostInput),
            update: jest.fn().mockResolvedValue(updatePostInput),
            preload: jest.fn().mockResolvedValue(updatePostInput),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Users),
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

    service = module.get<PostsService>(PostsService);
    repositoryPost = module.get<Repository<Posts>>(getRepositoryToken(Posts));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of posts', async () => {
      const findSpy = jest.spyOn(service, 'findAll');
      const post = await service.findAll(postArgs);
      expect(post).toEqual(postArray);
      expect(findSpy).toHaveBeenCalled();
    });
  });

  describe('findOneById()', () => {
    it('should return a single post', () => {
      expect(service.findOneById('anyid')).resolves.toEqual(onePost);
    });

    it('should return a exception when doesnt find a post by id', async () => {
      const repoSpy = jest
        .spyOn(repositoryPost, 'findOne')
        .mockReturnValue(null);
      const userNotFound = service.findOneById('anyid');
      expect(userNotFound).rejects.toThrow(
        new UserInputError('Post #anyid not found'),
      );
      expect(repoSpy).toHaveBeenCalledWith({
        where: { id: NaN },
        relations: ['users'],
      });
    });
  });

  describe('create()', () => {
    it('should successfully insert a post', async () => {
      const post = {
        title: 'title #1',
        description: 'description #1',
        users: [],
      };

      expect(
        await service.create({
          ...createPostInput,
        }),
      ).toEqual(post);
    });
  });

  describe('update()', () => {
    it('should update a post', async () => {
      const onePost = {
        title: 'title #1',
        description: 'description #1',
        users: [],
      };
      const updateSpy = jest.spyOn(repositoryPost, 'preload');
      expect(
        await service.update('anyid', {
          title: 'title #1',
          description: 'description #1',
          users: [],
        }),
      ).toEqual(onePost);
      expect(updateSpy).toHaveBeenCalled();
    });

    it('should return a exception when doesnt update a post by id', async () => {
      repositoryPost.preload = jest.fn().mockReturnValue(null);
      const userNotFound = service.update('not correct id ', {
        title: 'title not correct',
        description: 'description not correct',
        users: [],
      });
      expect(userNotFound).rejects.toThrow(UserInputError);
    });
  });
});
