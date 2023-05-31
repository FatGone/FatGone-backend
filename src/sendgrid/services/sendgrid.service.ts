import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { VERIFIED_SENDER } from 'src/core/utils/verified_sender';

@Injectable()
export class SendGridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }
  async sendEmailConfirmationCode(verificationCode: string, email: string) {
    const mail = {
      to: email,
      from: VERIFIED_SENDER,
      dynamic_template_data: { verificationCode: verificationCode },
      templateId: 'd-004891c21eba47c3adf1f80c294a84c2',
    };
    return await SendGrid.send(mail);
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
  async sendPostPurchaseMail(membershipType: string, email: string) {
    const mail = {
      to: email,
      from: VERIFIED_SENDER,
      dynamic_template_data: { membershipType: membershipType },
      templateId: 'd-0987e25dbc464e65a55c479705e7bd4e',
    };
    return await SendGrid.send(mail);
  }

  async sendCardChargeMail(email: string) {
    const mail = {
      to: email,
      from: VERIFIED_SENDER,
      templateId: 'd-1a5d7b2b5af4477aa36f3a581cbbaace',
    };
    return await SendGrid.send(mail);
  }
  async sendFingerprintResetMail(email: string) {
    const mail = {
      to: email,
      from: VERIFIED_SENDER,
      templateId: 'd-1a055a69879e4903b20f43d63094f840',
    };
    return await SendGrid.send(mail);
  }
}
