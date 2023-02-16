import { HttpException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from './entities/role.entity';
import { RolesService } from './roles.service';

const testRoles = [
  {
    id: 1,
    name: 'ADMIN',
  },
  {
    id: 2,
    name: 'USER',
  },
];

const testOneRole = {
  id: 1,
  name: 'ADMIN',
};

const testRole = {
  name: 'ADMIN',
};

const testUpdateRole = {
  name: 'ROLE update',
};

describe('RolesService', () => {
  let service: RolesService;
  let model: typeof Role;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getModelToken(Role),
          useValue: {
            findAll: jest.fn(() => testRoles),
            findOne: jest.fn(() => testOneRole),
            create: jest.fn(() => testRole),
            update: jest.fn(() => testUpdateRole),
            destroy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    model = module.get<typeof Role>(getModelToken(Role));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should get all roles', async () => {
      await expect(service.findAll()).resolves.toEqual(testRoles);
    });
  });

  describe('findOne()', () => {
    it('should get a single role', () => {
      const findSpy = jest.spyOn(model, 'findOne');
      expect(service.findOne('1'));
      expect(findSpy).toBeCalledWith({ where: { id: '1' } });
    });

    it('should throw an exception if it not found a role by id', async () => {
      model.findOne = jest.fn().mockResolvedValueOnce(null);
      await expect(service.findOne('not a correct id')).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('create()', () => {
    it('should create a new role', async () => {
      await expect(
        service.create({
          name: 'ADMIN',
        })
      ).resolves.toEqual(testRole);
    });

    it('should return an exception if create new role fails', async () => {
      model.create = jest.fn().mockRejectedValueOnce(null);
      await expect(
        service.create({
          name: 'not a correct name',
        })
      ).rejects.toThrow(HttpException);
    });
  });

  describe('update()', () => {
    it('should update a role by id', async () => {
      expect(await service.update('anyid', testUpdateRole)).toEqual(
        testUpdateRole
      );
    });

    it('should return an exception if update profile role fails', async () => {
      model.update = jest.fn().mockRejectedValueOnce(null);
      await expect(
        service.update('not a correct id', {
          name: 'not a correct name',
        })
      ).rejects.toThrow(HttpException);
    });
  });

  describe('remove()', () => {
    it('should remove a role by id', async () => {
      const destroyStub = jest.fn();
      const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({
        destroy: destroyStub,
      } as any);
      const retVal = await service.remove('any id');
      expect(findSpy).toBeCalledWith({ where: { id: 'any id' } });
      expect(retVal).toBeUndefined();
    });
  });
});
