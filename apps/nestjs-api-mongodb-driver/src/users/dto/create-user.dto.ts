import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  readonly name: string;

  @IsString()
  @MaxLength(30)
  readonly surname: string;

  @IsString()
  @MaxLength(40)
  readonly username: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;
}
