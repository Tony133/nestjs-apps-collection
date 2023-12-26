import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UsersArgs } from './dto/users.args';
import { Users } from './entities/users.entity';
import { HashingService } from '../shared/hashing/hashing.service';
import { ErrorWithProps } from 'mercurius';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly hashingService: HashingService,
  ) {}

  public async findAll(usersArgs: UsersArgs): Promise<Users[]> {
    const { limit, offset } = usersArgs;
    return this.usersRepository.find({
      skip: offset,
      take: limit,
    });
  }

  public async findOneById(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        id: +id,
      },
    });

    if (!user) {
      throw new ErrorWithProps(`User #${id} not found`);
    }
    return user;
  }

  public async create(createUserInput: CreateUserInput): Promise<Users> {
    createUserInput.password = await this.hashingService.hash(
      createUserInput.password,
    );

    const user = this.usersRepository.create({ ...createUserInput });
    return this.usersRepository.save(user);
  }

  public async update(
    id: string,
    updateUserInput: UpdateUserInput,
  ): Promise<Users> {
    updateUserInput.password = await this.hashingService.hash(
      updateUserInput.password,
    );

    const user = await this.usersRepository.preload({
      id: +id,
      ...updateUserInput,
    });

    if (!user) {
      throw new ErrorWithProps(`User #${id} not found`);
    }
    return this.usersRepository.save(user);
  }

  public async remove(id: string): Promise<any> {
    const user = await this.findOneById(id);
    return this.usersRepository.remove(user);
  }
}
