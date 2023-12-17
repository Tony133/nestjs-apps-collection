import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '../roles/entities/roles.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersArgs } from './dto/users.args';
import { Users } from './entities/users.entity';
import { HashingService } from '../shared/hashing/hashing.service';
import { UserInputError } from '@nestjs/apollo';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    private readonly hashingService: HashingService,
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
      throw new UserInputError(`User #${id} not found`);
    }
    return user;
  }

  public async create(createUserInput: CreateUserInput): Promise<Users> {
    createUserInput.password = await this.hashingService.hash(
      createUserInput.password,
    );

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
    updateUserInput.password = await this.hashingService.hash(
      updateUserInput.password,
    );

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
