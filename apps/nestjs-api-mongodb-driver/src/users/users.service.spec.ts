import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { Db } from 'mongodb';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockUsers = {
  name: 'name#1',
  surname: 'surname#1',
  username: 'username#1',
  password: 'pass123',
  email: 'test@example.com',
};

const mockOneUser = {
  _id: '1',
  name: 'name#1',
  surname: 'surname#1',
  username: 'username#1',
  password: 'pass123',
  email: 'test@example.com',
};

const testUser = {
  name: 'name#1',
  surname: 'surname#1',
  username: 'username#1',
  password: 'pass123',
  email: 'test@example.com',
};

const mockUser = {
  name: 'name#1',
  surname: 'surname#1',
  username: 'username#1',
  password: 'pass123',
  email: 'test@example.com',
};

describe('UsersService', () => {
  let service: UsersService;
  let database;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'DATABASE_CONNECTION',
          useValue: {
            collection: function () {
              return {
                findOne: jest.fn().mockResolvedValue(mockOneUser),
                insertOne: jest.fn(() => mockUser),
                updateOne: jest.fn(() => mockUser),
                deleteOne: jest.fn(() => mockUser),
                deletedCount: jest.fn(),
                find: function () {
                  return {
                    toArray: jest.fn(() => mockUsers),
                  };
                },
              };
            },
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    database = module.get<Db>('DATABASE_CONNECTION');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the users', async () => {
    expect(await service.findAll()).toEqual(mockUsers);
  });

  it('should get one user', async () => {
    const catFound = await service.findOne('611a80ee47347c2271183ccf');
    expect(catFound).toEqual(mockOneUser);
  });

  it('should throw an error if no user is found with an id', async () => {
    database.findOne = jest.fn().mockResolvedValueOnce(null);

    await expect(service.findOne('not correct id')).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should add a user', async () => {
    const mockCreateUser = {
      name: 'name#1',
      surname: 'surname#1',
      username: 'username#1',
      password: 'pass123',
      email: 'test@example.com',
    };

    expect(await service.create(mockCreateUser)).toEqual(testUser);
  });

  it('should throw an error if no user is created', async () => {
    const mockCreateUser = {
      name: 'not correct name',
      surname: 'not correct surname',
      username: 'not correct username',
      password: 'not corret password',
      email: 'not correct email',
    };

    database.insertOne = jest.fn().mockResolvedValueOnce(null);

    console.log(await service.create(mockCreateUser));
    await expect(service.create(mockCreateUser)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should update a user', async () => {
    const mockUpdateUser = {
      id: 1,
      name: 'name#1',
      surname: 'surname#1',
      username: 'username#1',
      password: 'pass123',
      email: 'test@example.com',
    };
    expect(
      await service.update('611a80ee47347c2271183aaf', mockUpdateUser),
    ).toEqual(testUser);
  });

  it('should throw an error if the user is updated via id', async () => {
    const mockUpdateUser = {
      id: 'not correct id',
      name: 'not correct name',
      surname: 'not correct surname',
      username: 'not correct username',
      password: 'not corret password',
      email: 'not correct email',
    };

    database.updateOne = jest.fn().mockResolvedValueOnce(null);

    await expect(
      service.update('not correct id', mockUpdateUser),
    ).rejects.toThrow(BadRequestException);
  });

  it('should delete one user', async () => {
    const userDelete = await service.remove('611a80ee47347c2271183aaf');
    expect(userDelete).toEqual(mockUser);
  });

  it('should throw an error if the user is not deleted by id', async () => {
    database.deleteOne = jest.fn().mockResolvedValueOnce(null);

    await expect(service.remove('not correct id')).rejects.toThrow(
      NotFoundException,
    );
  });
});
