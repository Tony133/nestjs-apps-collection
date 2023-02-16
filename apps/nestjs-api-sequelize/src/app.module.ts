import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        dialect: 'mysql',
        host: configService.get<string>('MYSQL_HOST', 'localhost'), // database host
        port: configService.get<number>('MYSQL_PORT', 3306), // database host
        username: configService.get<string>('MYSQL_USER', 'root'), // user
        password: configService.get<string>('MYSQL_PASSWORD', 'root'), // password
        database: configService.get<string>('MYSQL_DATABASE', 'nest'), // name of our database,
        autoLoadModels: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    RolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
