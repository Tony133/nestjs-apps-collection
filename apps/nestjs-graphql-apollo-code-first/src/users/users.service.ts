import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from '../roles/entities/roles.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersArgs } from './dto/users.args';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  public async findAll(usersArgs: UsersArgs): Promise<Users[]> {
    const { limit, offset } = usersArgs;
    return this.usersRepository.find({
      relations: ['roles'],
      skip: offset,
      take: limit,
    });
  }

  public async findOneById(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        id: +id,
      },
      relations: ['roles'],
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  public async create(createUserInput: CreateUserInput): Promise<Users> {
    createUserInput.password = bcrypt.hashSync(createUserInput.password, 8);

    const roles = await Promise.all(
      createUserInput.roles.map((name) => this.preloadRoleByName(name)),
    );

    const user = this.usersRepository.create({ ...createUserInput, roles });
    return this.usersRepository.save(user);
  }

  public async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<Users> {
    updateUserInput.password = bcrypt.hashSync(updateUserInput.password, 8);

    const roles =
      updateUserInput.roles &&
      (await Promise.all(
        updateUserInput.roles.map((name) => this.preloadRoleByName(name)),
      ));

    const user = await this.usersRepository.preload({
      id: +id,
      ...updateUserInput,
      roles,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.usersRepository.save(user);
  }

  public async remove(id: string): Promise<any> {
    const user = await this.findOneById(id);
    return this.usersRepository.remove(user);
  }

  private async preloadRoleByName(name: string): Promise<Roles> {
    const existingRole = await this.rolesRepository.findOne({
      where: { name: name },
    });
    if (existingRole) {
      return existingRole;
    }
    return this.rolesRepository.create({ name });
  }
}
