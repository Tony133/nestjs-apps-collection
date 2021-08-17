import { MaxLength, IsNotEmpty, IsString, IsOptional } from 'class-validator';

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
  @IsOptional()
  readonly customers: string;
}
