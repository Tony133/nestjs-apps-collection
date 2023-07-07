import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { ArticlesArgs, CreateArticleInput, UpdateArticleInput } from './dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articlesRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  public async findAll(articlesArgs: ArticlesArgs): Promise<Article[]> {
    const { limit, offset } = articlesArgs;
    return this.articlesRepository.find({
      relations: ['users'],
      skip: offset,
      take: limit,
    });
  }

  public async findOne(id: number): Promise<Article> {
    const article = this.articlesRepository.findOne({
      where: {
        id: +id,
      },
      relations: ['users'],
    });

    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }

    return article;
  }

  public async create(
    createArticleInput: CreateArticleInput
  ): Promise<Article> {
    const users = await Promise.all(
      createArticleInput.users.map((name) => this.preloadUserByName(name))
    );

    const article = this.articlesRepository.create({
      ...createArticleInput,
      users,
    });
    return this.articlesRepository.save(article);
  }

  public async update(
    id: number,
    updateArticleInput: UpdateArticleInput
  ): Promise<Article> {
    const users =
      updateArticleInput.users &&
      (await Promise.all(
        updateArticleInput.users.map((name) => this.preloadUserByName(name))
      ));

    const article = await this.articlesRepository.preload({
      id: +id,
      ...updateArticleInput,
      users,
    });

    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }

    return this.articlesRepository.save(article);
  }

  public async remove(id: number): Promise<any> {
    const article = await this.findOne(id);
    return this.articlesRepository.remove(article);
  }

  private async preloadUserByName(name: string): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { name: name },
    });
    if (existingUser) {
      return existingUser;
    }
    return this.usersRepository.create({ name });
  }
}
