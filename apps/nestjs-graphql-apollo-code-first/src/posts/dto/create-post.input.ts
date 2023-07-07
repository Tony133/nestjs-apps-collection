import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  readonly title: string;

  @Field()
  @IsString()
  @MaxLength(200)
  @IsNotEmpty()
  readonly description: string;

  @IsOptional()
  @IsString({ each: true })
  @Field((type) => [String], { nullable: true })
  users?: string[];
}
