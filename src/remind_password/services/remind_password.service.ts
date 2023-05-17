import { Inject, NotFoundException, forwardRef } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { SendGridService } from 'src/sendgrid/services/sendgrid.service';
import { Repository } from 'typeorm/repository/Repository';
import { RemindPassword } from '../models/remind_password.model';
import { AccountService } from 'src/accounts/services/account.service';
import { DateTime } from 'luxon';

@Injectable()
export class RemindPasswordService {
  constructor(
    @InjectRepository(RemindPassword)
    private readonly remindPasswordRepository: Repository<RemindPassword>,
    @Inject(forwardRef(() => SendGridService))
    private readonly sendGridService: SendGridService,
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
  ) {}
  async remindPassword(email: string): Promise<void> {
    const account = await this.accountService.findByEmail(email);
    if (account) {
      const remindPassword = new RemindPassword();
      remindPassword.accountId = account.id;
      remindPassword.remindCode = Math.floor(100000 + Math.random() * 900000);
      remindPassword.expiryDate = DateTime.now().plus({ day: 1 }).toISO();
      const code = await this.remindPasswordRepository.save(remindPassword);
      if (code) {
        await this.sendGridService.sendPasswordResetCode(
          code.remindCode,
          account.email,
        );
      }
    }
  }
  async findByAccountId(id: number): Promise<RemindPassword> {
    return this.remindPasswordRepository.findOne({
      where: { accountId: id },
    });
  }
  async findById(id: number): Promise<RemindPassword> {
    return this.remindPasswordRepository.findOne({
      where: { id: id },
    });
  }
  async deleteById(id: number): Promise<void> {
    const remindPassword = await this.findById(id);
    if (remindPassword) {
      await this.remindPasswordRepository.remove(remindPassword);
    } else {
      throw new NotFoundException();
    }
  }
}
