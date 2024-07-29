import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @IsString()
  @ApiProperty({
    description: 'The name of the company',
    example: 'Company A',
  })
  @IsNotEmpty()
  name: string;

  @IsString()
  @ApiProperty({
    description: 'The email of the company',
    example: 'a@b.c',
  })
  @IsOptional()
  email?: string;

  @IsString()
  @ApiProperty({
    description: 'The phone number of the company',
    example: '1234567890',
  })
  @IsOptional()
  phone?: string;

  @IsString()
  @ApiProperty({
    description: 'The address of the company',
    example: '123 Main St.',
  })
  @IsOptional()
  address?: string;
}
