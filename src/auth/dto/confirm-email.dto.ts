import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ConfirmEmailDto {
  @IsString()
  @IsNotEmpty()
  sessionId: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;
}
