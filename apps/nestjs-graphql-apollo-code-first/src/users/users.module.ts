import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Users } from './entities/users.entity';
import { Roles } from '../roles/entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
