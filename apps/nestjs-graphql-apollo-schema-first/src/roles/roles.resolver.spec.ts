import { Test, TestingModule } from '@nestjs/testing';
import { RolesArgs, CreateRoleInput, UpdateRoleInput } from './dto';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { UserInputError } from '@nestjs/apollo';

const rolesArgs: RolesArgs = {
  offset: 0,
  limit: 25,
};

const createRoleInput: CreateRoleInput = {
  name: 'role #1',
};

const updateRoleInput: UpdateRoleInput = {
  name: 'role #1',
};

describe('RolesResolver', () => {
  let resolver: RolesResolver;
  let service: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesResolver,
        {
          provide: RolesService,
          useFactory: () => ({
            findAll: jest.fn().mockResolvedValue({
              name: 'role #1',
              id: '1',
            }),
            update: jest.fn().mockResolvedValue({
              name: 'role #1',
              id: '1',
            }),
            findOne: jest.fn(() => []),
            create: jest.fn(() => {}),
            remove: jest.fn(() => {}),
          }),
        },
      ],
    }).compile();

    resolver = module.get<RolesResolver>(RolesResolver);
    service = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call method findAll in RolesService', async () => {
      await resolver.findAll(rolesArgs);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw if RolesService findAll throws', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValueOnce(new UserInputError('error'));
      await expect(resolver.findAll(rolesArgs)).rejects.toThrow(
        new UserInputError('error'),
      );
    });
  });

  describe('findOne()', () => {
    it('should call method findOne in RoleService id with correct value', async () => {
      await resolver.findOne(1);
      expect(service.findOne).toHaveBeenCalled();
    });

    it('should throw if RoleService findOne throws', async () => {
      jest
        .spyOn(service, 'findOne')
        .mockRejectedValueOnce(new UserInputError('error'));
      await expect(resolver.findOne(1)).rejects.toThrow(
        new UserInputError('error'),
      );
    });
  });

  describe('create()', () => {
    it('should call method create in RolesService with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await resolver.create(createRoleInput);
      expect(createSpy).toHaveBeenCalledWith(createRoleInput);
    });
  });

  describe('update()', () => {
    it('should call method update in RolesService with correct values', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      await resolver.update(1, updateRoleInput);
      expect(updateSpy).toHaveBeenCalledWith(1, updateRoleInput);
    });
  });

  describe('remove()', () => {
    it('should call method remove in RolesService with correct value', async () => {
      const deleteSpy = jest.spyOn(service, 'remove');
      await resolver.remove(1);
      expect(deleteSpy).toHaveBeenCalledWith(1);
    });

    it('should throw error if id in RolesService not exists', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new UserInputError('error'));
      await expect(resolver.remove(1)).rejects.toThrow(
        new UserInputError('error'),
      );
    });
  });
});
