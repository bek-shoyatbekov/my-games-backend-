import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CheckEmailDto } from './dto/check-email.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('email/check')
  @HttpCode(HttpStatus.OK)
  async checkEmail(@Body(ValidationPipe) checkEmailDto: CheckEmailDto) {
    const sessionId = await this.authService.checkEmail(checkEmailDto.email);
    return { sessionId };
  }

  @Post('email/confirm')
  @HttpCode(HttpStatus.OK)
  async confirmEmail(@Body(ValidationPipe) confirmEmailDto: ConfirmEmailDto) {
    const result = await this.authService.confirmEmail(
      confirmEmailDto.sessionId,
      confirmEmailDto.code,
    );
    return { result };
  }
}
