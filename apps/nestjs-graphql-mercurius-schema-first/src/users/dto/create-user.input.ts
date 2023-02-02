import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @MaxLength(30)
  @Field()
  readonly name: string;

  @IsString()
  @MaxLength(40)
  @Field()
  readonly username: string;

  @IsEmail()
  @Field()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  @Field()
  password: string;
}
