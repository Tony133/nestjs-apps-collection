import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from '../common/auth.guard';
import { CreateRoleInput, RolesArgs } from './dto';
import { Roles } from './entities/roles.entity';
import { RolesService } from './roles.service';

@Resolver()
@UseGuards(AuthGuard)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query(() => [Roles])
  public async findAllRole(@Args() rolesArgs: RolesArgs): Promise<Roles[]> {
    return this.rolesService.findAll(rolesArgs);
  }

  @Query(() => Roles)
  public async findOneRole(@Args('id') id: string): Promise<Roles> {
    const role = await this.rolesService.findOneById(id);
    if (!role) {
      throw new NotFoundException(id);
    }
    return role;
  }

  @Mutation(() => Roles)
  public async createRole(
    @Args('createRoleInput') createRoleInput: CreateRoleInput
  ): Promise<Roles> {
    return await this.rolesService.create(createRoleInput);
  }

  @Mutation(() => Roles)
  public async removeRole(@Args('id') id: string): Promise<Roles> {
    return this.rolesService.remove(id);
  }
}
