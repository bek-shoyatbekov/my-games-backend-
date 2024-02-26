import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { MulterModule } from '@nestjs/platform-express';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { GeneratorService } from './generator/generator.service';
import { RedisOptions } from './configs/app-options.constants';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { MailService } from './mail/mail.service';
import { AuthModule } from './auth/auth.module';
import { AllExceptionsFilter } from './all-exceptions/all-exceptions.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    UsersModule,
    MulterModule.register({ dest: 'public/' }),
    EventEmitterModule.forRoot(),
    MailModule,
    CacheModule.registerAsync(RedisOptions),
    EmailModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    MailService,
    GeneratorService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    EmailService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
