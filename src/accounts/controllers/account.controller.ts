import { AccountService } from '../services/account.service';
import { CurrentAccount } from '../decorators/account.decorator';
import { Account } from '../model/account.model';
import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { Secured } from 'src/auth/decorators/secured.decorator';
import { SendGridService } from 'src/sendgrid/services/sendgrid.service';
import { ResetFingerprintDto } from '../model/reset_fingerprint.dto';
@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(
    private accountService: AccountService,
    private sendGridService: SendGridService,
  ) {}

  @Get()
  @Secured()
  @ApiNotFoundResponse({
    description:
      "Account details not found for this account. Probably details wasn't set.",
  })
  @ApiOkResponse({
    type: Account,
    description:
      'Return account details, if not assigned empty map will be returned',
  })
  async get(@CurrentAccount() account: Account): Promise<Account> {
    return await this.accountService.findById(account.id);
  }

  @ApiCreatedResponse({
    description: 'Account was removed successfully',
  })
  @ApiNotFoundResponse({
    description: 'Account not found.',
  })
  @Secured()
  @Delete()
  async delete(@CurrentAccount() account: Account): Promise<void> {
    return await this.accountService.delete(account.id);
  }

  @Post('send-fingerprint-reset-mail')
  @Secured()
  @ApiCreatedResponse({
    description: 'Email with fingerprint reset send.',
  })
  @ApiBadRequestResponse({ description: 'Server error.' })
  async sendFingerprintResetMail(
    @Body() resetFingerprintDto: ResetFingerprintDto,
  ): Promise<void> {
    await this.sendGridService.sendFingerprintResetMail(
      resetFingerprintDto.mail,
    );
  }
}
