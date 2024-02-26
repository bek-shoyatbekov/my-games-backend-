import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EmailService } from 'src/email/email.service';
import { EmailModule } from 'src/email/email.module';
import { GeneratorService } from 'src/generator/generator.service';
import { MailService } from 'src/mail/mail.service';

@Module({
  imports: [EmailModule],
  controllers: [AuthController],
  providers: [AuthService, EmailService, GeneratorService, MailService],
})
export class AuthModule {}
