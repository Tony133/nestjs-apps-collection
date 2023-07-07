import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../users/entities/users.entity';
import { Repository } from 'typeorm';
import { CreatePostInput, UpdatePostInput, PostsArgs } from './dto';
import { Posts } from './entities/posts.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postsRepository: Repository<Posts>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>
  ) {}

  public async findAll(postsArgs: PostsArgs): Promise<Posts[]> {
    const { limit, offset } = postsArgs;
    return this.postsRepository.find({
      relations: ['users'],
      skip: offset,
      take: limit,
    });
  }

  public async findOneById(id: string): Promise<Posts> {
    const post = await this.postsRepository.findOne({
      where: {
        id: +id,
      },
      relations: ['users'],
    });

    if (!post) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return post;
  }

  public async create(createPostInput: CreatePostInput): Promise<Posts> {
    const users = await Promise.all(
      createPostInput.users?.map((name) => this.preloadUserByName(name))
    );

    const post = this.postsRepository.create({ ...createPostInput, users });
    return this.postsRepository.save(post);
  }

  public async update(
    id: string,
    updatePostInput: UpdatePostInput
  ): Promise<Posts> {
    const users =
      updatePostInput.users &&
      (await Promise.all(
        updatePostInput.users?.map((name) => this.preloadUserByName(name))
      ));

    const user = await this.postsRepository.preload({
      id: +id,
      ...updatePostInput,
      users,
    });

    if (!user) {
      throw new NotFoundException(`Post #${id} not found`);
    }
    return this.postsRepository.save(user);
  }

  private async preloadUserByName(name: string): Promise<Users> {
    const existingUser = await this.usersRepository.findOne({
      where: { name: name },
    });
    if (existingUser) {
      return existingUser;
    }
    return this.usersRepository.create({ name });
  }
}
