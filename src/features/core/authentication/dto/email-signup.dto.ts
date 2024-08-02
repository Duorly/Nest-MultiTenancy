import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EmailSignupDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'nebel.mass@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Nebel',
    description: 'The username of the user',
    required: false,
  })
  username: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
    required: false,
  })
  password: string;
}
