import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesResolver } from './roles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './entities/roles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Roles])],
  providers: [RolesResolver, RolesService]
})
export class RolesModule {}
