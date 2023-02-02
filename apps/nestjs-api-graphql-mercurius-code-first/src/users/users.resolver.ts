import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput, UsersArgs } from './dto';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [Users])
  public async users(@Args() usersArgs: UsersArgs): Promise<Users[]> {
    return this.usersService.findAll(usersArgs);
  }

  @Query(() => Users)
  public async user(@Args('id') id: string): Promise<Users> {
    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException(id);
    }
    return user;
  }

  @Mutation(() => Users)
  public async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<Users> {
    return await this.usersService.create(createUserInput);
  }

  @Mutation(() => Users)
  public async updateUser(
    @Args('id') id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<Users> {
    return await this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => Users)
  public async removeUser(@Args('id') id: string): Promise<any> {
    return this.usersService.remove(id);
  }
}
