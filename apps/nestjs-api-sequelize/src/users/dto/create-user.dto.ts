import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(30)
  readonly name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(30)
  readonly surname: string;

  @ApiProperty()
  @IsString()
  @MaxLength(40)
  readonly username: string;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  password: string;

  @ApiProperty({ required: false })
  @IsString({ each: true })
  readonly roles?: string[];
}
