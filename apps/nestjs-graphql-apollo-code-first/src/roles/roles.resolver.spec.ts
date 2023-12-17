import { Test, TestingModule } from '@nestjs/testing';
import { RolesArgs, CreateRoleInput } from './dto';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import { UserInputError } from '@nestjs/apollo';

const rolesArgs: RolesArgs = {
  skip: 0,
  take: 25,
};

const createRoleInput: CreateRoleInput = {
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
            findOneById: jest.fn(() => []),
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
      await resolver.findAllRole(rolesArgs);
      expect(service.findAll).toHaveBeenCalled();
    });

    it('should throw if RolesService findAll throws', async () => {
      jest
        .spyOn(service, 'findAll')
        .mockRejectedValueOnce(new UserInputError('error'));
      await expect(resolver.findAllRole(rolesArgs)).rejects.toThrow(
        new UserInputError('error'),
      );
    });
  });

  describe('findOne()', () => {
    it('should call method findOneRole in RoleService id with correct value', async () => {
      await resolver.findOneRole('1');
      expect(service.findOneById).toHaveBeenCalled();
    });

    it('should throw if RoleService findOne throws', async () => {
      jest
        .spyOn(service, 'findOneById')
        .mockRejectedValueOnce(new UserInputError('error'));
      await expect(resolver.findOneRole('1')).rejects.toThrow(
        new UserInputError('error'),
      );
    });
  });

  describe('create()', () => {
    it('should call method createRole in RolesService with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');
      await resolver.createRole(createRoleInput);
      expect(createSpy).toHaveBeenCalledWith(createRoleInput);
    });
  });

  describe('remove()', () => {
    it('should call method removeRole in RolesService with correct value', async () => {
      const deleteSpy = jest.spyOn(service, 'remove');
      await resolver.removeRole('1');
      expect(deleteSpy).toHaveBeenCalledWith('1');
    });

    it('should throw error if id in RolesService not exists', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new UserInputError('error'));
      await expect(resolver.removeRole('1')).rejects.toThrow(
        new UserInputError('error'),
      );
    });
  });
});
