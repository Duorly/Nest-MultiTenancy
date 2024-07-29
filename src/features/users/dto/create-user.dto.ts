import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '068539223',
    description: 'The name of the user',
  })
  phone: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'nebel.mass@gmail.com',
    description: 'The email of the user',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'password',
    description: 'The password of the user',
  })
  password: string;
}
