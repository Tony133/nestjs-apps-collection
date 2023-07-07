import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Users } from './entities/users.entity';
import { Roles } from '../roles/entities/roles.entity';
import { HashingService } from '../shared/hashing/hashing.service';
import { BcryptService } from '../shared/hashing/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Roles])],
  providers: [
    UsersService,
    UsersResolver,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
  ],
})
export class UsersModule {}
