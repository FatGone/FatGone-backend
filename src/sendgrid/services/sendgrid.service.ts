import { Injectable, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendGridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }
  async sendEmailConfirmationCode(code: string, email: string) {
    const mail = {
      to: email,
      from: VERIFIED_SENDER,
      templateId: 'not-implemented',
    };
    throw new NotImplementedException();
  }

  async sendPostRegisterMail(email: string) {
    const mail = {
      to: email,
      from: VERIFIED_SENDER,
      templateId: 'd-7d102b25cfb44207908a6c252e7e9b10',
    };
    const transport = await SendGrid.send(mail);
    return transport;
  }

  async sendPasswordResetCode(code: string, email: string) {
    const mail = {
      to: email,
      from: VERIFIED_SENDER,
      templateId: 'not-implemented',
    };
    throw new NotImplementedException();
  }
}
