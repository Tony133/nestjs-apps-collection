import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../roles/entities/roles.entity';
import { Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput, UsersArgs } from './dto';
import { User } from './entities/user.entity';
import { UserInputError } from '@nestjs/apollo';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public async findAll(usersArgs: UsersArgs): Promise<User[]> {
    const { limit, offset } = usersArgs;
    return this.usersRepository.find({
      relations: ['roles'],
      skip: offset,
      take: limit,
    });
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: +id,
      },
      relations: ['roles'],
    });

    if (!user) {
      throw new UserInputError(`User #${id} not found`);
    }
    return user;
  }

  public async create(createUserInput: CreateUserInput): Promise<User> {
    const roles = await Promise.all(
      createUserInput.roles.map((name) => this.preloadRoleByName(name)),
    );

    const user = this.usersRepository.create({ ...createUserInput, roles });
    return this.usersRepository.save(user);
  }

  public async update(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
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
      throw new UserInputError(`User #${id} not found`);
    }
    return this.usersRepository.save(user);
  }

  public async remove(id: number): Promise<any> {
    const user = await this.findOne(id);
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
