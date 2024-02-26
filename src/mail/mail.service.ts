import { Injectable } from '@nestjs/common';
import { Email } from './entities/email.entity';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async send(email: Email) {
    const sentEmailResult = await this.mailerService.sendMail({
      to: email.to,
      subject: email.subject,
      html: email.html,
    });
    console.log('sentEmailResult', sentEmailResult);
    return sentEmailResult;
  }

  getConfirmationEmailHtml = (
    code: number,
    email: string,
  ) => `<p>Hey ${email},</p>
  <p>Please enter below confirmation code to confirm your email.</p>
  <p>
      Code : ${code}
  </p>
  
  <p>If you did not request this email you can safely ignore it.</p>`;
}
