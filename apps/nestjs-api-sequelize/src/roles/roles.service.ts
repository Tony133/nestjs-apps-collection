import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role
  ) {}

  public async create(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const role = await this.roleModel.create({
        name: createRoleDto.name,
      });
      return role;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(): Promise<Role[]> {
    return await this.roleModel.findAll();
  }

  public async findOne(roleId: string): Promise<Role> {
    const role = await this.roleModel.findOne({
      where: {
        id: roleId,
      },
    });

    if (!role) {
      throw new NotFoundException(`Role #${roleId} not found`);
    }

    return role;
  }

  public async update(
    roleId: string,
    updateRoleDto: UpdateRoleDto
  ): Promise<any> {
    try {
      const role = await this.roleModel.update(
        {
          ...updateRoleDto,
        },
        {
          where: {
            id: roleId,
          },
        }
      );
      return role;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async remove(roleId: string): Promise<void> {
    const user = await this.findOne(roleId);
    await user.destroy();
  }
}
