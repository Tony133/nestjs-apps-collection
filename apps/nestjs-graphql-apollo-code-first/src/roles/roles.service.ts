import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleInput, RolesArgs } from './dto';
import { Roles } from './entities/roles.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  public async findAll(rolesArgs: RolesArgs): Promise<Roles[]> {
    return this.rolesRepository.find(rolesArgs);
  }

  public async findOneById(id: string): Promise<Roles> {
    const role = await this.rolesRepository.findOne({ where: { id: +id } });
    if (!role) {
      throw new NotFoundException(`Role #${id} not found`);
    }
    return role;
  }

  public async create(createRoleInput: CreateRoleInput): Promise<Roles> {
    const role = this.rolesRepository.create({ ...createRoleInput });
    return this.rolesRepository.save(role);
  }

  public async remove(id: string): Promise<any> {
    const role = await this.findOneById(id);
    return this.rolesRepository.remove(role);
  }
}
