import { InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleInput } from './create-article.input';

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {}