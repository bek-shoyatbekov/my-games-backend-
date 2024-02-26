import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class AuthService {
  constructor(private readonly emailService: EmailService) {}
  async checkEmail(email: string) {
    const sessionId = await this.emailService.checkEmail(email);

    return sessionId;
  }

  async confirmEmail(sessionId: string, code: number) {
    const result = await this.emailService.confirmEmail(sessionId, code);
    return result;
  }
}
