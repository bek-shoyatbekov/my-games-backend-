import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GeneratorService {
  getEmailConfirmationCode() {
    return Math.floor(10000 + Math.random() * 90000);
  }
  getSessionId() {
    return uuid();
  }
}
