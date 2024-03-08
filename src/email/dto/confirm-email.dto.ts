import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class ConfirmEmailDto {
  @IsNotEmpty()
  @IsString()
  sessionId: string;

  @IsNotEmpty()
  @IsNumber()
  code: number;
}
