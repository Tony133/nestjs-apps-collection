import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

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

  @IsString({ each: true })
  readonly users: string[];
}
