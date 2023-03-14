import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ArticlesModule } from './articles/articles.module';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { GraphqlOptions } from './graphql.options';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { AppResolver } from '../../nestjs-graphql-mercurius-schema-first/src/app.resolver';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST', 'localhost'),
        port: config.get('DATABASE_PORT', 5432),
        username: config.get<string>('DATABASE_USER', 'postgres'),
        password: config.get<string>('DATABASE_PASSWORD', 'pass123'),
        database: config.get<string>('DATABASE_NAME', 'postgres'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlOptions,
    }),
    ArticlesModule,
    UsersModule,
    RolesModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
