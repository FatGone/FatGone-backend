import { AccountService } from '../services/account.service';
import { CurrentAccount } from '../decorators/account.decorator';
import { Account } from '../model/account.model';
import { Controller, Delete, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Secured } from 'src/auth/decorators/secured.decorator';
@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

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
}
