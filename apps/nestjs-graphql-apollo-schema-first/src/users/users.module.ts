import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Roles } from '../roles/entities/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Roles])
  ],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
