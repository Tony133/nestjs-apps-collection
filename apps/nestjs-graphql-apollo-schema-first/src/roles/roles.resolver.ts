import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { CreateRoleInput, UpdateRoleInput, RolesArgs } from './dto';

@Resolver('Roles')
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation('createRole')
  create(@Args('createRoleInput') createRoleInput: CreateRoleInput) {
    return this.rolesService.create(createRoleInput);
  }

  @Query('roles')
  findAll(@Args() rolesArgs: RolesArgs) {
    return this.rolesService.findAll(rolesArgs);
  }

  @Query('role')
  findOne(@Args('id') id: number) {
    return this.rolesService.findOne(id);
  }

  @Mutation('updateRole')
  update(
    @Args('id') id: number,
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
  ) {
    return this.rolesService.update(id, updateRoleInput);
  }

  @Mutation('removeRole')
  remove(@Args('id') id: number) {
    return this.rolesService.remove(id);
  }
}
