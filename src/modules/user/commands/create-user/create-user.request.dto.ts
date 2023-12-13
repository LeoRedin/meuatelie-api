import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserRequestDto {
  @ApiProperty({
    example: 'john@gmail.com',
    description: 'User email address',
  })
  @MaxLength(320)
  @MinLength(5)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: 'mySup3rPassW0rd',
    description: 'Your super secure password',
  })
  @MaxLength(50)
  @MinLength(4)
  @IsString()
  @Matches(/^[a-zA-Z ]*$/)
  readonly password: string;
}
