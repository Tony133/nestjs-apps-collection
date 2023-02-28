import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlOptions } from './graphql.options';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: config.get<number>('DATABASE_PORT', 5432),
        username: config.get<string>('DATABASE_USER', 'postgres'),
        password: config.get<string>('DATABASE_PASSWORD', 'pass123'),
        database: config.get<string>('DATABASE_NAME', 'postgres'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    GraphQLModule.forRootAsync<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      useClass: GraphqlOptions,
    }),
    UsersModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
