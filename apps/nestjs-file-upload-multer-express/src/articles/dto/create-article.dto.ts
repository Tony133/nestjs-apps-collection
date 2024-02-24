import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
   title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
   description: string;
}
