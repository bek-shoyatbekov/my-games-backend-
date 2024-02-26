import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

@Injectable()
export class GeneratorService {
  getEmailConfirmationCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  getSessionId() {
    return uuid();
  }
}
