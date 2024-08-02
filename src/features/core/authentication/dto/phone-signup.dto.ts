import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PhoneSignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '068539223',
    description: 'The email of the user',
  })
  phone: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Nebel',
    description: 'The username of the user',
    required: false,
  })
  username: string;
}
