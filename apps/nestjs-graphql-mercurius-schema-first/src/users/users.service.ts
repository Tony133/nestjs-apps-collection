import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput, UpdateUserInput, UsersArgs } from './dto';
import { User } from './entities/user.entity';
import { HashingService } from '../shared/hashing/hashing.service';
import { ErrorWithProps } from 'mercurius';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
  ) {}

  public async findAll(usersArgs: UsersArgs): Promise<User[]> {
    const { limit, offset } = usersArgs;
    return this.usersRepository.find({
      skip: offset,
      take: limit,
    });
  }

  public async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new ErrorWithProps(`User #${id} not found`);
    }
    return user;
  }

  public async create(createUserInput: CreateUserInput): Promise<User> {
    createUserInput.password = await this.hashingService.hash(
      createUserInput.password,
    );

    const user = this.usersRepository.create({ ...createUserInput });
    return this.usersRepository.save(user);
  }

  public async update(
    id: number,
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
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

  public async remove(id: number): Promise<any> {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
