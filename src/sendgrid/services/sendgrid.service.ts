import { Injectable, NotImplementedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { VERIFIED_SENDER } from 'src/core/utils/verified_sender';

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
    return await SendGrid.send(mail);
  }

  async sendPasswordResetCode(code: number, email: string) {
    const mail = {
      to: email,
      from: VERIFIED_SENDER,
      dynamic_template_data: { code: code },
      templateId: 'd-f397ef6a2f75498d9d931add0658ce8d',
    };
    return await SendGrid.send(mail);
  }
}
