import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Db, ObjectId } from 'mongodb';
import type {
  WithId,
  Document,
  InsertOneResult,
  UpdateResult,
  DeleteResult,
} from 'mongodb';
import { InjectClient } from 'nest-mongodb-driver';

@Injectable()
export class UsersService {
  constructor(@InjectClient() private readonly db: Db) {}

  public async findAll(): Promise<Document[]> {
    return await this.db.collection('users').find().toArray();
  }

  public async findOne(id: string): Promise<WithId<Document>> {
    if (!ObjectId.isValid(id)) {
      throw new NotFoundException();
    }

    const result = await this.db.collection('users').findOne({
      _id: new ObjectId(id),
    });
    return result;
  }

  public async create(
    createUserDto: CreateUserDto,
  ): Promise<InsertOneResult<Document>> {
    try {
      return await this.db.collection('users').insertOne(createUserDto);
    } catch (err) {
      throw new BadRequestException();
    }
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult<Document>> {
    try {
      const result = this.db.collection('users').updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $set: {
            ...updateUserDto,
          },
        },
      );

      return result;
    } catch (err) {
      throw new BadRequestException();
    }
  }

  public async remove(id: string): Promise<DeleteResult> {
    if (!ObjectId.isValid(id)) {
      throw new NotFoundException();
    }

    const result = await this.db.collection('users').deleteOne({
      _id: new ObjectId(id),
    });

    return result;
  }
}
