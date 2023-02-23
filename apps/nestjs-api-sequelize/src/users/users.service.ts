import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../roles/entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User
  ) {}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      createUserDto.password = bcrypt.hashSync(createUserDto.password, 8);

      const user = await this.userModel.create(
        {
          ...createUserDto,
          // roles: [{ name: createUserDto.roles }],
        },
        {
          include: [Role],
        }
      );

      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(): Promise<User[]> {
    return await this.userModel.findAll({
      include: [
        {
          model: Role,
        },
      ],
    });
  }

  public async findOne(userId: string): Promise<User> {
    const user = await this.userModel.findOne({
      where: {
        id: userId,
      },
      include: [
        {
          model: Role,
        },
      ],
    });
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return user;
  }

  public async update(
    userId: string,
    updateUserDto: UpdateUserDto
  ): Promise<any> {
    try {
      updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 8);

      const user = await this.userModel.update(
        {
          ...updateUserDto,
          roles: [{ name: updateUserDto.roles }],
        },
        {
          where: {
            id: userId,
          },
        }
      );

      return user;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async remove(userId: string): Promise<void> {
    const user = await this.findOne(userId);
    await user.destroy();
  }
}
