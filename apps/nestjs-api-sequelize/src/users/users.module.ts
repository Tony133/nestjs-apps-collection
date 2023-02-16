import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UserRole } from './entities/user-role.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, UserRole])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
