import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashingService } from './../shared/hashing/hashing.service';
import { BcryptService } from './../shared/hashing/bcrypt.service';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Users } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    UsersService,
    UsersResolver,
  ],
})
export class UsersModule {}
