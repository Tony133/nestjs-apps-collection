import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const oneUser = {
  id: 1,
  name: 'name#1',
  surname: 'surname#1',
  username: 'username#1',
  email: 'test@example.it',
  password: 'pass123',
  roles: ['ADMIN'],
};

const createUserDto = {
  name: 'name#1',
  surname: 'surname#1',
  username: 'username#1',
  email: 'test@example.it',
  password: 'pass123',
  roles: ['ADMIN'],
};

const updateUserDto = {
  name: 'name#1 update',
  surname: 'surname#1 update',
  username: 'username#1 update',
  email: 'test@example.it',
  password: 'pass123',
  roles: ['ADMIN'],
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(() => createUserDto),
            findAll: jest.fn(() => []),
            findOne: jest.fn(() => oneUser),
            update: jest.fn(() => {}),
            remove: jest.fn(() => {}),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call method findAll in UsersService', async () => {
      await usersController.findAll();
      expect(usersService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should call method findOne in UsersService', async () => {
      const findUserSpy = jest.spyOn(usersService, 'findOne');
      await usersController.findOne('anyid');
      expect(findUserSpy).toHaveBeenCalled();
    });
  });

  describe('create()', () => {
    it('should call method create in UsersService with correct values', async () => {
      const createUsersSpy = jest.spyOn(usersService, 'create');
      await usersController.create(createUserDto);
      expect(createUsersSpy).toHaveBeenCalledWith(createUserDto);
      expect({
        name: 'name#1',
        surname: 'surname#1',
        username: 'username#1',
        email: 'test@example.it',
        password: 'pass123',
        roles: ['ADMIN'],
      }).toEqual(createUserDto);
    });
  });

  describe('update()', () => {
    it('should call method update in UsersService with correct values', async () => {
      const updateUserSpy = jest.spyOn(usersService, 'update');
      await usersController.update('anyid', updateUserDto);
      expect(updateUserSpy).toHaveBeenCalledWith('anyid', updateUserDto);
    });
  });

  describe('remove()', () => {
    it('should call methoed remove in UsersService with correct value', async () => {
      const removeUserSpy = jest.spyOn(usersService, 'remove');
      await usersController.remove('anyid');
      expect(removeUserSpy).toHaveBeenCalledWith('anyid');
    });
  });
});
