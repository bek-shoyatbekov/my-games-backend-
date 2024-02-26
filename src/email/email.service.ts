import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import { GeneratorService } from 'src/generator/generator.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly generatorService: GeneratorService,
    private readonly mailService: MailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async checkEmail(email: string) {
    const code = this.generatorService.getEmailConfirmationCode();
    const sessionId = this.generatorService.getSessionId();
    const sentEmailResult = await this.mailService.send({
      to: email,
      subject: 'Email confirmation',
      html: this.mailService.getConfirmationEmailHtml(code, email),
    });
    if (sentEmailResult.rejected.length > 0) {
      return false;
    }

    await this.cacheManager.set(
      sessionId,
      JSON.stringify({
        email,
        code,
      }),
    );

    return sessionId;
  }
  async confirmEmail(sessionId: string, code: number) {
    const cache: string = await this.cacheManager.get(sessionId);
    if (!cache) return false;

    const cacheData = JSON.parse(cache);

    if (!cacheData.email || !cacheData.code || cacheData.code !== code)
      return false;

    return true;
  }
}
