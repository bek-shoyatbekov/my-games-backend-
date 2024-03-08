import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CheckEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
