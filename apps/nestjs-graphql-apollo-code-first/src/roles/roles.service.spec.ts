import { Test, TestingModule } from '@nestjs/testing';
import { Roles } from './entities/roles.entity';
import { RolesService } from './roles.service';
import { CreateRoleInput, RolesArgs } from './dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInputError } from '@nestjs/apollo';

const rolesArgs: RolesArgs = {
  skip: 0,
  take: 25,
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
      expect(service.findOneById('1')).resolves.toEqual(oneRole);
      expect(repoSpy).toBeCalledWith({ where: { id: 1 } });
    });

    it('should return a exception when doesnt find a role by id', async () => {
      const repoSpy = jest
        .spyOn(repositoryRole, 'findOne')
        .mockReturnValue(null);
      const roleNotFound = service.findOneById('2');
      expect(roleNotFound).rejects.toThrow(UserInputError);
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
        }),
      ).toEqual(role);
    });
  });

  describe('remove()', () => {
    it('should return role remove', async () => {
      const deleteSpy = jest.spyOn(repositoryRole, 'remove');
      const response = await service.remove('anyid');
      expect(deleteSpy).toHaveBeenCalledWith(oneRole);
      expect(response).toBeUndefined();
    });
  });
});
