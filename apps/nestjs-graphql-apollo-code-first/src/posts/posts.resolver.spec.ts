import { Test, TestingModule } from '@nestjs/testing';
import { CreatePostInput, UpdatePostInput, PostsArgs } from './dto';
import { Posts } from './entities/posts.entity';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { UserInputError } from '@nestjs/apollo';

const postsArgs: PostsArgs = {
  offset: 0,
  limit: 25,
};

const onePost: Posts = {
  id: 1,
  title: 'title #1',
  description: 'deescription #1',
  users: [],
};

const createPostInput: CreatePostInput = {
  title: 'title #1',
  description: 'deescription #1',
  users: [],
};

const updatePostInput: UpdatePostInput = {
  title: 'title #1',
  description: 'deescription #1',
  users: [],
};

describe('PostsResolver', () => {
  let resolver: PostsResolver;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsResolver,
        {
          provide: PostsService,
          useFactory: () => ({
            findAll: jest.fn().mockResolvedValue({
              id: '1',
              title: 'title #1',
              description: 'deescription #1',
            }),
            findOneById: jest.fn().mockReturnValue(onePost),
            create: jest.fn(() => createPostInput),
            update: jest.fn().mockResolvedValue({
              title: 'title #1',
              description: 'deescription #1',
            }),
            remove: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    resolver = module.get<PostsResolver>(PostsResolver);
    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call method findAll in PostsService', async () => {
      await resolver.posts(postsArgs);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should call method findOneById in PostsService id with correct value', async () => {
      await resolver.post('1');
      expect(service.findOneById).toHaveBeenCalled();
    });

    it('should throw if not found post by id throws', async () => {
      jest
        .spyOn(service, 'findOneById')
        .mockRejectedValueOnce(new UserInputError('error'));
      await expect(resolver.post('1')).rejects.toThrow(
        new UserInputError('error'),
      );
    });
  });

  describe('create()', () => {
    it('should call method create in PostsService with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await resolver.createPost(createPostInput);
      expect(createSpy).toHaveBeenCalledWith(createPostInput);
    });
  });

  describe('update()', () => {
    it('should call method update in PostsService with correct values', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await resolver.updatePost('1', updatePostInput);
      expect(updateSpy).toHaveBeenCalledWith('1', updatePostInput);
    });
  });
});
