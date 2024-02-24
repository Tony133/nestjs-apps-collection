import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';
import { FileUploadService } from '../file-upload/file-upload.service';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private fileUploadService: FileUploadService,
  ) {}

  public async create(createArticleDto: CreateArticleDto, file: any) {
    const fileName = await this.uploadFile(file);
    const article = this.articleRepository.create({
      ...createArticleDto,
      file: fileName,
    });

    return this.articleRepository.save(article, file);
  }

  public async findAll() {
    return this.articleRepository.find({});
  }

  public async findOne(id: number) {
    const article = await this.articleRepository.findOne({ where: { id: id } });
    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    return article;
  }

  public async update(
    id: number,
    updateArticleDto: UpdateArticleDto,
    file: any,
  ) {
    const fileName = await this.uploadFile(file);
    const article = await this.articleRepository.preload({
      id: +id,
      ...updateArticleDto,
      file: fileName,
    });
    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    return this.articleRepository.save(article, file);
  }

  public async remove(id: number) {
    const article = await this.findOne(id);
    return this.articleRepository.remove(article);
  }

  private async uploadFile(file: any) {
    return await this.fileUploadService.createFile(file);
  }
}
