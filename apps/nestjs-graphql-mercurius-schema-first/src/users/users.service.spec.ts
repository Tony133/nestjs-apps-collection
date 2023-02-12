import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UsersArgs } from './dto/users.args';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NotFoundException } from '@nestjs/common';

const oneUser: User = {
  id: 1,
  name: 'tony',
  username: 'tony_admin',
  email: 'tony_admin@example.com',
  password: 'secret',
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
  password: 'secret',
};

const userArray: User = {
  id: 1,
  name: 'tony',
  username: 'tony_admin',
  email: 'tony_admin@example.com',
  password: 'secret',
};

describe('UsersService', () => {
  let service: UsersService;
  let repositoryUser: Repository<User>;
  const usersArgs: UsersArgs = {
    offset: 0,
    limit: 25,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn().mockReturnValue(createUserInput),
            save: jest.fn(),
            preload: jest.fn().mockResolvedValue(updateUserInput),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryUser = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of users', async () => {
      const findSpy = jest.spyOn(service, 'findAll');
      const users = await service.findAll(usersArgs);
      expect(users).toEqual(userArray);
      expect(findSpy).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(repositoryUser, 'findOne');
      expect(service.findOne(1)).resolves.toEqual(oneUser);
      expect(repoSpy).toBeCalledWith({ where: { id: 1 } });
    });

    it('should return a exception when doesnt find a user by id', async () => {
      const repoSpy = jest
        .spyOn(repositoryUser, 'findOne')
        .mockReturnValue(null);
      const userNotFound = service.findOne(2);
      expect(userNotFound).rejects.toThrow(NotFoundException);
      expect(repoSpy).toHaveBeenCalledWith({ where: { id: 2 } });
    });
  });

  describe('create()', () => {
    it('should successfully insert a user', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await service.create(createUserInput);
      expect(createSpy).toHaveBeenCalledWith(createUserInput);
    });
  });

  describe('update()', () => {
    it('should call the update method', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await service.update(1, updateUserInput);
      expect(updateSpy).toHaveBeenCalledWith(1, updateUserInput);
    });

    it('should return a exception when doesnt update a user by id', async () => {
      repositoryUser.preload = jest.fn().mockReturnValue(null);
      const userNotFound = service.update(2, {
        name: 'user update',
        email: 'test@example.com',
        username: 'username update',
        password: 'secret',
      });
      expect(userNotFound).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove()', () => {
    it('should return user remove', async () => {
      const deleteSpy = jest.spyOn(service, 'remove');
      await service.remove(1);
      expect(deleteSpy).toBeCalledWith(1);
    });
  });
});
