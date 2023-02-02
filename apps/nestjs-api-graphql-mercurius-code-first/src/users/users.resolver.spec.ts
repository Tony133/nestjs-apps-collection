import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { UsersArgs } from './dto/users.args';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NotFoundException } from '@nestjs/common';

describe('UsersResolver', () => {
  let resolver: UsersResolver;
  let service: UsersService;
  const usersArgs: UsersArgs = {
    offset: 0,
    limit: 25,
  };

  const createUserInput: CreateUserInput = {
    name: 'user #1',
    email: 'test@example.com',
    username: 'username #1',
    password: 'secret',
  };

  const updateUserInput: UpdateUserInput = {
    name: 'user update',
    email: 'test@example.com',
    username: 'username update',
    password: 'secret123',
  };

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

    resolver = module.get<UsersResolver>(UsersResolver);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('users()', () => {
    it('should call method findAll in UsersService', async () => {
      await resolver.users(usersArgs);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw if UsersService findAll throws', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(resolver.users(usersArgs)).rejects.toThrow(
        new NotFoundException()
      );
    });

    it('should return user on success', async () => {
      await resolver.users(usersArgs);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('user()', () => {
    it('should call method findOneById in UsersService id with correct value', async () => {
      await resolver.user('anyid');
      expect(service.findOneById).toHaveBeenCalled();
    });

    it('should throw if UserService findOneById throws', async () => {
      jest
        .spyOn(service, 'findOneById')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(resolver.user('anyid')).rejects.toThrow(
        new NotFoundException()
      );
    });

    it('should return a user on success', async () => {
      await resolver.user('anyid');
      expect(service.findOneById).toHaveBeenCalled();
    });
  });

  describe('createUser()', () => {
    it('should call method create in UsersService with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await resolver.createUser(createUserInput);
      expect(createSpy).toHaveBeenCalledWith(createUserInput);
    });

    it('should return a user on success', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await resolver.createUser(createUserInput);
      expect(createSpy).toHaveBeenCalledWith(createUserInput);
    });
  });

  describe('updateUser()', () => {
    it('should call method update in UsersService with correct values', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await resolver.updateUser('anyid', updateUserInput);
      expect(updateSpy).toHaveBeenCalledWith('anyid', updateUserInput);
    });
  });

  describe('removeUser()', () => {
    it('should call method remove in UsersService with correct value', async () => {
      const deleteSpy = jest.spyOn(service, 'remove');
      await resolver.removeUser('anyid');
      expect(deleteSpy).toHaveBeenCalledWith('anyid');
    });

    it('should throw error if id in UsersService not exists', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(resolver.removeUser('anyid')).rejects.toThrow(
        new NotFoundException()
      );
    });
  });
});
