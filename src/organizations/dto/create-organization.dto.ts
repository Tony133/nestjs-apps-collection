import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @MaxLength(40)
  @IsNotEmpty()
  readonly address: string;

  @IsString()
  @MaxLength(50)
  readonly description: string;

  @IsString()
  readonly customers: string;
}
