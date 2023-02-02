import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  readonly name: string;

  @Field()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsString()
  @MaxLength(40)
  readonly username: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;
}
