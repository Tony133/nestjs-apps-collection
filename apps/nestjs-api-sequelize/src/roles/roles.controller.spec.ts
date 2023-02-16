import { Test, TestingModule } from '@nestjs/testing';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

const oneRole = {
  name: 'ADMIN',
};

const createRoleDto = {
  name: 'ADMIN',
};

const updateRoleDto = {
  name: 'ADMIN',
};

describe('RolesController', () => {
  let rolesController: RolesController;
  let rolesService: RolesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        {
          provide: RolesService,
          useValue: {
            create: jest.fn(() => createRoleDto),
            findAll: jest.fn(() => []),
            findOne: jest.fn(() => {}),
            update: jest.fn(() => {}),
            remove: jest.fn(() => {}),
          },
        },
      ],
    }).compile();

    rolesController = module.get<RolesController>(RolesController);
    rolesService = module.get<RolesService>(RolesService);
  });

  it('should be defined', () => {
    expect(rolesController).toBeDefined();
  });

  describe('findAll()', () => {
    it('should call method findAll in RolesService', async () => {
      await rolesController.findAll();
      expect(rolesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne()', () => {
    it('should call method findOne in RolesService', async () => {
      const findRoleSpy = jest.spyOn(rolesService, 'findOne');
      await rolesController.findOne('anyid');
      expect(findRoleSpy).toHaveBeenCalled();
    });
  });

  describe('create()', () => {
    it('should call method create in RolesService with correct values', async () => {
      const createRoleSpy = jest.spyOn(rolesService, 'create');
      await rolesController.create(createRoleDto);
      expect(createRoleSpy).toHaveBeenCalledWith(createRoleDto);
    });
  });

  describe('update()', () => {
    it('should call method update in RolesService with correct values', async () => {
      const updateRoleSpy = jest.spyOn(rolesService, 'update');
      await rolesController.update('anyid', updateRoleDto);
      expect(updateRoleSpy).toHaveBeenCalledWith('anyid', updateRoleDto);
    });
  });

  describe('remove()', () => {
    it('should call methoed remove in RolesService with correct value', async () => {
      const removeRoleSpy = jest.spyOn(rolesService, 'remove');
      await rolesController.remove('anyid');
      expect(removeRoleSpy).toHaveBeenCalledWith('anyid');
    });
  });
});
