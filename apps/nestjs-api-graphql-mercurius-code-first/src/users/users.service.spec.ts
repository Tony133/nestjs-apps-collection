import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { Roles } from '../roles/entities/roles.entity';
import { Posts } from '../posts/entities/posts.entity';
import { RolesService } from '../roles/roles.service';
import { UsersArgs } from './dto/users.args';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NotFoundException } from '@nestjs/common';

const oneUser: Users = {
  id: 1,
  name: 'tony',
  username: 'tony_admin',
  email: 'tony_admin@example.it',
  password: 'secret',
  roles: Roles['ADMIN'],
  posts: Posts['1'],
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
  password: 'secret',
  roles: ['ADMIN'],
};

const userArray: Users = {
  id: 1,
  name: 'tony',
  username: 'tony_admin',
  email: 'tony_admin@example.it',
  password: 'secret',
  roles: Roles['ADMIN'],
  posts: Posts['1'],
};

describe('UsersService', () => {
  let service: UsersService;
  let repositoryUser: Repository<Users>;
  let repositoryRole: Repository<Roles>;
  const usersArgs: UsersArgs = {
    offset: 0,
    limit: 25,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        UsersService,
        {
          provide: getRepositoryToken(Roles),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Users),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockResolvedValue(oneUser),
            create: jest.fn(),
            save: jest.fn(),
            preload: jest.fn().mockResolvedValue(updateUserInput),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryUser = module.get<Repository<Users>>(getRepositoryToken(Users));
    repositoryRole = module.get<Repository<Roles>>(getRepositoryToken(Roles));
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

  describe('findOneById()', () => {
    it('should get a single user', () => {
      const repoSpy = jest.spyOn(repositoryUser, 'findOne');
      expect(service.findOneById('anyid')).resolves.toEqual(oneUser);
      expect(repoSpy).toBeCalledWith('anyid', { relations: ['roles'] });
    });

    it('should return a exception when doesnt find a user by id', async () => {
      const repoSpy = jest
        .spyOn(repositoryUser, 'findOne')
        .mockReturnValue(null);
      const userNotFound = service.findOneById('anyid');
      expect(userNotFound).rejects.toThrow(
        new NotFoundException('User #anyid not found'),
      );
      expect(repoSpy).toHaveBeenCalledWith('anyid', { relations: ['roles'] });
    });
  });

  describe('create()', () => {
    it('should successfully insert a user', async () => {
      const user = {
        name: 'user #1',
        email: 'test@example.it',
        username: 'username #1',
        password: 'secret',
        roles: Roles['ADMIN'],
      };

      const roles = ['ADMIN'];

      await service.create({ ...user, roles });
      expect(
        service.create({
          ...user,
          roles,
        }),
      ).resolves.toEqual(user);
    });
  });

  describe('update()', () => {
    it('should call the update method', async () => {
      const oneUser = {
        name: 'user #1',
        email: 'test@example.it',
        username: 'username #1',
        password: 'secret',
        roles: Roles['ADMIN'],
      };
      const updateSpy = jest.spyOn(repositoryUser, 'preload');
      const updateUser = await service.update('anyid', updateUserInput);
      expect(
        service.update('anyid', {
          name: 'user #1',
          email: 'test@example.it',
          username: 'username #1',
          password: 'secret',
          roles: Roles['ADMIN'],
        }),
      ).resolves.toEqual(oneUser);
    });

    it('should return a exception when doesnt update a user', async () => {
      jest
        .spyOn(service, 'update')
        .mockRejectedValueOnce(new NotFoundException('User #anyid not found'));
      expect(service.update).rejects.toThrow(
        new NotFoundException('User #anyid not found'),
      );
    });
  });

  describe('remove()', () => {
    it('should return user remove', async () => {
      const deleteSpy = jest.spyOn(repositoryUser, 'remove');
      const response = await service.remove('anyid');
      expect(deleteSpy).toBeCalledWith(oneUser);
      expect(response).toBeUndefined();
    });
  });
});
