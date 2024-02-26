import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  avatar: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsString()
  fcm?: string;
}
