import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleInput, UpdateRoleInput, RolesArgs } from './dto';
import { Roles } from './entities/roles.entity';
import { UserInputError } from '@nestjs/apollo';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  public async findAll(rolesArgs: RolesArgs): Promise<Roles[]> {
    const { limit, offset } = rolesArgs;
    return await this.rolesRepository.find({
      skip: offset,
      take: limit,
    });
  }

  public async findOne(id: number): Promise<Roles> {
    const role = await this.rolesRepository.findOne({ where: { id: id } });
    if (!role) {
      throw new UserInputError(`Role #${id} not found`);
    }
    return role;
  }

  public async create(createRoleInput: CreateRoleInput): Promise<Roles> {
    const role = this.rolesRepository.create({ ...createRoleInput });
    return this.rolesRepository.save(role);
  }

  public async update(id: number, updateRoleInput: UpdateRoleInput) {
    const role = await this.rolesRepository.preload({
      id: +id,
      ...updateRoleInput,
    });

    if (!role) {
      throw new UserInputError(`Role #${id} not found`);
    }
    return this.rolesRepository.save(role);
  }

  public async remove(id: number): Promise<any> {
    const role = await this.findOne(id);
    return this.rolesRepository.remove(role);
  }
}
