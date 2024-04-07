import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Express } from 'express';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  public create(
    @Body() createArticleDto: CreateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.articlesService.create(createArticleDto, file);
  }

  @Get()
  public findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.articlesService.update(+id, updateArticleDto, file);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
