import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';
import { UsersArgs } from './dto/users.args';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NotFoundException } from '@nestjs/common';
import { BcryptService } from '../shared/hashing/bcrypt.service';
import { HashingService } from '../shared/hashing/hashing.service';
import { Posts } from '../posts/entities/posts.entity';
import { Roles } from '../roles/entities/roles.entity';

const usersArgs: UsersArgs = {
  offset: 0,
  limit: 25,
};

const oneUser: Users = {
  id: 1,
  name: 'tony',
  username: 'tony_admin',
  email: 'tony_admin@example.com',
  password: 'secret',
  roles: [],
  posts: new Posts(),
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
  password: 'secret',
};

const userArray: Users = {
  id: 1,
  name: 'tony',
  username: 'tony_admin',
  email: 'tony_admin@example.com',
  password: 'secret',
  roles: [],
  posts: new Posts(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repositoryUser: Repository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: HashingService,
          useClass: BcryptService,
        },
        {
          provide: getRepositoryToken(Users),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn().mockReturnValue(oneUser),
            create: jest.fn().mockResolvedValue(createUserInput),
            save: jest.fn().mockResolvedValue(createUserInput),
            preload: jest.fn().mockResolvedValue(updateUserInput),
            update: jest.fn().mockResolvedValue(updateUserInput),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Roles),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repositoryUser = module.get<Repository<Users>>(getRepositoryToken(Users));
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
    it('should return a single user', () => {
      expect(service.findOneById('anyid')).resolves.toEqual(oneUser);
    });

    it('should return a exception when doesnt find a user by id', async () => {
      const repoSpy = jest
        .spyOn(repositoryUser, 'findOne')
        .mockReturnValue(null);
      const userNotFound = service.findOneById('anyid');
      expect(userNotFound).rejects.toThrow(
        new NotFoundException('User #anyid not found')
      );
      expect(repoSpy).toHaveBeenCalledWith({
        where: { id: NaN },
        relations: ['roles'],
      });
    });
  });

  describe('create()', () => {
    it('should successfully insert a user', async () => {
      const user = {
        name: 'user #1',
        email: 'test@example.com',
        username: 'username #1',
        password: 'secret',
        roles: [],
      };

      expect(
        await service.create({
          ...createUserInput,
        })
      ).toEqual(user);
    });
  });

  describe('update()', () => {
    it('should update a user', async () => {
      const oneUser = {
        name: 'user #1',
        email: 'test@example.com',
        username: 'username #1',
        password: 'secret',
        roles: [],
      };
      const updateSpy = jest.spyOn(repositoryUser, 'preload');
      expect(
        await service.update('anyid', {
          name: 'user #1',
          email: 'test@example.com',
          username: 'username #1',
          password: 'secret',
          roles: [],
        })
      ).toEqual(oneUser);
      expect(updateSpy).toHaveBeenCalled();
    });

    it('should return a exception when doesnt update a user by id', async () => {
      repositoryUser.preload = jest.fn().mockReturnValue(null);
      const userNotFound = service.update('not correct id ', {
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
      const deleteSpy = jest.spyOn(repositoryUser, 'remove');
      const response = await service.remove('anyid');
      expect(deleteSpy).toBeCalledWith(oneUser);
      expect(response).toBeUndefined();
    });
  });
});
