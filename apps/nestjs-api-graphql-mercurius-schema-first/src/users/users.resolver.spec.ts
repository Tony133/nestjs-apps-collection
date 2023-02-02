import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { RolesService } from '../roles/roles.service';
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
    email: 'test@example.it',
    username: 'username #1',
    password: 'secret',
    roles: ['ADMIN'],
  };

  const updateUserInput: UpdateUserInput = {
    name: 'user update',
    email: 'test@example.it',
    username: 'username update',
    password: 'secret123',
    roles: ['ADMIN'],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersResolver,
        {
          provide: RolesService,
          useValue: {
            findOne: jest.fn(() => []),
            create: jest.fn(() => {}),
          },
        },
        {
          provide: UsersService,
          useFactory: () => ({
            findAll: jest.fn().mockResolvedValue({
              name: 'user #1',
              email: 'test@example.it',
              username: 'username #1',
              password: 'secret',
              roles: ['ADMIN'],
              id: '1',
            }),
            update: jest.fn().mockResolvedValue({
              name: 'user update',
              email: 'test@example.it',
              username: 'username update',
              password: 'secret123',
              roles: ['ADMIN'],
            }),
            findOne: jest.fn(() => []),
            create: jest.fn(() => {}),
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

  describe('findAll()', () => {
    it('should call method findAll in UsersService', async () => {
      await resolver.findAll(usersArgs);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw if UsersService findAll throws', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(resolver.findAll(usersArgs)).rejects.toThrow(
        new NotFoundException(),
      );
    });

    it('should return user on success', async () => {
      await resolver.findAll(usersArgs);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should call method findOne in UsersService id with correct value', async () => {
      await resolver.findOne(1);
      expect(service.findOne).toHaveBeenCalled();
    });

    it('should throw if UserService findOne throws', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(resolver.findOne(1)).rejects.toThrow(
        new NotFoundException(),
      );
    });

    it('should return a user on success', async () => {
      await resolver.findOne(1);
      expect(service.findOne).toHaveBeenCalled();
    });
  });

  describe('create()', () => {
    it('should call method create in UsersService with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await resolver.create(createUserInput);
      expect(createSpy).toHaveBeenCalledWith(createUserInput);
    });

    it('should return a user on success', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await resolver.create(createUserInput);
      expect(createSpy).toHaveBeenCalledWith(createUserInput);
    });
  });

  describe('update()', () => {
    it('should call method update in UsersService with correct values', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await resolver.update(1, updateUserInput);
      expect(updateSpy).toHaveBeenCalledWith(1, updateUserInput);
    });
  });

  describe('remove()', () => {
    it('should call method remove in UsersService with correct value', async () => {
      const deleteSpy = jest.spyOn(service, 'remove');
      await resolver.remove(1);
      expect(deleteSpy).toHaveBeenCalledWith(1);
    });

    it('should throw error if id in UsersService not exists', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new NotFoundException());
      await expect(resolver.remove(1)).rejects.toThrow(new NotFoundException());
    });
  });
});
