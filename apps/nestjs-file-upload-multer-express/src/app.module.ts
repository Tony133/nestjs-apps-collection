import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from './articles/articles.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql' as 'mysql',
        host: configService.get<string>('DB_MYSQL_HOST', 'locahost'),
        port: +configService.get<number>('DB_MYSQL_PORT', 3306),
        username: configService.get<string>('DB_MYSQL_USER', 'root'),
        password: configService.get<string>('DB_MYSQL_PASSWORD', 'root'),
        database: configService.get<string>('DB_MYSQL_DATABASE', 'nest'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    ArticlesModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
