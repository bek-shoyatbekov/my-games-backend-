import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { EmailService } from './email.service';
import CheckEmailDto from './dto/check-email.dto';
import { ConfirmEmailDto } from 'src/auth/dto/confirm-email.dto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('check')
  async check(@Body(ValidationPipe) checkEmailDto: CheckEmailDto) {
    const sessionId = await this.emailService.checkEmail(checkEmailDto.email);
    if (!sessionId) throw new Error('email not found');
    return sessionId;
  }

  @Post('confirm')
  async confirm(@Body(ValidationPipe) confirmEmailDto: ConfirmEmailDto) {
    const result = await this.emailService.confirmEmail(
      confirmEmailDto.sessionId,
      confirmEmailDto.code,
    );
    return result;
  }
}
