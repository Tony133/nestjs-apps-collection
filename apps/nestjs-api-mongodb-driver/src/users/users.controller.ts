import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type {
  WithId,
  Document,
  InsertOneResult,
  UpdateResult,
  DeleteResult,
} from 'mongodb';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll(): Promise<Document[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<WithId<Document>> {
    return await this.usersService.findOne(id);
  }

  @Post()
  public async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<InsertOneResult<Document>> {
    return await this.usersService.create(createUserDto);
  }

  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult<Document>> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.usersService.remove(id);
  }
}
