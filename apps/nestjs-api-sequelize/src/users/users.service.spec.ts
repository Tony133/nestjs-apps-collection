import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { describe } from 'node:test';
import { HttpException, NotFoundException } from '@nestjs/common';

const testUsers = [
  {
    id: 1,
    name: 'name#1',
    surname: 'surname#1',
    username: 'username#1',
    email: 'test@example.it',
    password: 'pass123',
    roles: ['ADMIN'],
  },
  {
    id: 2,
    name: 'name#2',
    surname: 'surname#2',
    username: 'username#2',
    email: 'test@example.it',
    password: 'pass123',
    roles: ['ADMIN'],
  },
];

const testUser = {
  name: 'name#1',
  surname: 'surname#1',
  username: 'username#1',
  email: 'test@example.it',
  password: 'pass123',
  roles: ['ADMIN'],
};

const testOneUser = {
  id: 1,
  name: 'name#1',
  surname: 'surname#1',
  username: 'username#1',
  email: 'test@example.it',
  password: 'pass123',
  roles: [
    {
      id: 1,
      name: 'ADMIN',
    },
  ],
};

const testUpdateUser = {
  name: 'name update',
  surname: 'surname update',
  username: 'username update',
  email: 'test@example.it',
  password: 'pass123',
};

describe('UsersService', () => {
  let service: UsersService;
  let model: typeof User;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken(User),
          useValue: {
            findAll: jest.fn(() => testUsers),
            findOne: jest.fn(() => testUser),
            create: jest.fn(() => testUser),
            update: jest.fn(() => testUpdateUser),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<typeof User>(getModelToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should create a new user', async () => {
      await expect(
        service.create({
          name: 'name#1',
          surname: 'surname#1',
          username: 'username#1',
          email: 'test@example.it',
          password: 'pass123',
          roles: ['ADMIN'],
        })
      ).resolves.toEqual(testUser);
    });

    it('should return an exception if create new user fails', async () => {
      model.create = jest.fn().mockRejectedValueOnce(null);
      await expect(
        service.create({
          name: 'not a correct name',
          surname: 'not a corret surname',
          username: 'not a correct username',
          email: 'not a correct email',
          password: 'not a correct password',
          roles: ['not a correct rols'],
        })
      ).rejects.toThrow(HttpException);
    });
  });

  describe('findAll()', () => {
    it('should get all users', async () => {
      await expect(service.findAll()).resolves.toEqual(testUsers);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', async () => {
      await expect(service.findOne('1')).resolves.toEqual(testUser);
    });

    it('should throw an exception if it not found a user by id', async () => {
      model.findOne = jest.fn().mockResolvedValueOnce(null);
      await expect(service.findOne('not a correct id')).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('update()', () => {
    it('should update a user by id', async () => {
      expect(await service.update('anyid', testUpdateUser)).toEqual(
        testUpdateUser
      );
    });

    it('should return an exception if update profile user fails', async () => {
      model.update = jest.fn().mockRejectedValueOnce(null);
      await expect(
        service.update('not a correct id', {
          name: 'not a correct name',
          surname: 'not a corret surname',
          username: 'not a correct username',
          email: 'not a correct email',
          password: 'not a correct password',
        })
      ).rejects.toThrow(HttpException);
    });
  });

  describe('remove()', () => {
    it('should remove a user by id', async () => {
      const destroyStub = jest.fn();
      const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
        destroy: destroyStub,
      } as any);
      const retVal = await service.remove('any id');
      expect(findSpy).toBeCalled();
      expect(retVal).toBeUndefined();
    });
  });
});
