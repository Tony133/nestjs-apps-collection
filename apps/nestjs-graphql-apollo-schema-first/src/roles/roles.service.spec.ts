import { Test, TestingModule } from '@nestjs/testing';
import { RolesService } from './roles.service';
import { RolesArgs, CreateRoleInput, UpdateRoleInput } from './dto';
import { NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './entities/roles.entity';

const rolesArgs: RolesArgs = {
  offset: 0,
  limit: 25,
};

const rolesArray: Roles = {
  name: 'ADMIN',
  id: 1,
  users: [],
};

const oneRole: Roles = {
  name: 'ADMIN',
  id: 1,
  users: [],
};

const createRoleInput: CreateRoleInput = {
  name: 'ADMIN',
};

const updateRoleInput: UpdateRoleInput = {
  name: 'ADMIN',
};

describe('RolesService', () => {
  let service: RolesService;
  let repositoryRole: Repository<Roles>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Roles),
          useValue: {
            find: jest.fn().mockResolvedValue(rolesArray),
            findOne: jest.fn().mockReturnValue(oneRole),
            create: jest.fn().mockResolvedValue(createRoleInput),
            save: jest.fn().mockResolvedValue(createRoleInput),
            update: jest.fn().mockResolvedValue(updateRoleInput),
            preload: jest.fn().mockResolvedValue(updateRoleInput),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    repositoryRole = module.get<Repository<Roles>>(getRepositoryToken(Roles));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll()', () => {
    it('should return an array of roles', async () => {
      const findSpy = jest.spyOn(service, 'findAll');
      const roles = await service.findAll(rolesArgs);
      expect(roles).toEqual(rolesArray);
      expect(findSpy).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should get a single role', () => {
      const repoSpy = jest.spyOn(repositoryRole, 'findOne');
      expect(service.findOne(1)).resolves.toEqual(oneRole);
      expect(repoSpy).toBeCalledWith({ where: { id: 1 } });
    });

    it('should return a exception when doesnt find a role by id', async () => {
      const repoSpy = jest
        .spyOn(repositoryRole, 'findOne')
        .mockReturnValue(null);
      const roleNotFound = service.findOne(2);
      expect(roleNotFound).rejects.toThrow(NotFoundException);
      expect(repoSpy).toHaveBeenCalledWith({ where: { id: 2 } });
    });
  });

  describe('create()', () => {
    it('should successfully insert a role', async () => {
      const role = {
        name: 'ADMIN',
      };

      expect(
        await service.create({
          ...createRoleInput,
        })
      ).toEqual(role);
    });
  });

  describe('update()', () => {
    it('should successfully update a role', async () => {
      const updateRole = {
        name: 'ADMIN',
      };

      expect(
        await service.update(1, {
          ...updateRoleInput,
        })
      ).toEqual(updateRole);
    });

    it('should return a exception when doesnt find a role by id', async () => {
      const repoSpy = jest
        .spyOn(repositoryRole, 'preload')
        .mockReturnValue(null);
      const roleNotFound = service.update(2, updateRoleInput);
      expect(roleNotFound).rejects.toThrow(NotFoundException);
      expect(repoSpy).toHaveBeenCalledWith({ id: 2, name: 'ADMIN' });
    });
  });

  describe('remove()', () => {
    it('should return role remove', async () => {
      const deleteSpy = jest.spyOn(repositoryRole, 'remove');
      const response = await service.remove(2);
      expect(deleteSpy).toBeCalledWith(oneRole);
      expect(response).toBeUndefined();
    });
  });
});
