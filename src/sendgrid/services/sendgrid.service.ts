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
      templateId: 'd-67eec06a17db4091be51149c339b278e',
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
      templateId: ' d-58c87a23a35049d981a1ea57cc1d9ade',
    };
    return await SendGrid.send(mail);
  }

  async sendCardChargeMail(email: string) {
    const mail = {
      to: email,
      from: VERIFIED_SENDER,
      templateId: 'd-28ffde9f30084288b0d6059b6f183c74',
    };
    return await SendGrid.send(mail);
  }
  async sendFingerprintResetMail(email: string) {
    const mail = {
      to: email,
      from: VERIFIED_SENDER,
      templateId: 'd-0f67ee2160574c7aba1851b1de8a2719',
    };
    return await SendGrid.send(mail);
  }
}
