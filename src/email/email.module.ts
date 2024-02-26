import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { GeneratorService } from 'src/generator/generator.service';
import { MailService } from 'src/mail/mail.service';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [CacheModule.register({ ttl: 1000 * 60 * 5 }), MailModule],
  providers: [EmailService, GeneratorService, MailService],
})
export class EmailModule {}
