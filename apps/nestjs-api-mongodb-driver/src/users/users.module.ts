import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongoDbDriverModule } from 'nest-mongodb-driver';

@Module({
  imports: [
    MongoDbDriverModule.forRootAsync({
      useFactory: () => ({
        url: 'mongodb://127.0.0.1:27017/nest',
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
