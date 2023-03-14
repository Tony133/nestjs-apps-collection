import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserInput, UpdateUserInput, UsersArgs } from './dto';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

const usersArgs: UsersArgs = {
  offset: 0,
  limit: 25,
};

const createUserInput: CreateUserInput = {
  name: 'user #1',
  email: 'test@example.com',
  username: 'username #1',
  password: 'secret',
  roles: [],
};

const updateUserInput: UpdateUserInput = {
  name: 'user update',
  email: 'test@example.com',
  username: 'username update',
  password: 'secret123',
};

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useFactory: () => ({
            findAll: jest.fn().mockResolvedValue({
              name: 'user #1',
              email: 'test@example.com',
              username: 'username #1',
              password: 'secret',
              id: '1',
            }),
            update: jest.fn().mockResolvedValue({
              name: 'user update',
              email: 'test@example.com',
              username: 'username update',
              password: 'secret123',
            }),
            findOneById: jest.fn(() => []),
            create: jest.fn(() => createUserInput),
            remove: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
