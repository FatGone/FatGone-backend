import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Patch,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AccountDetailsService as AccountDetailsService } from '../services/account_details.service';
import { AccountDetailsDto } from '../dto/account_details.dto';
import { AccountDetails } from '../models/account_details.model';
import { Secured } from 'src/auth/decorators/secured.decorator';

import { CurrentAccount } from 'src/accounts/decorators/account.decorator';
import { Account } from 'src/accounts/model/account.model';

@ApiTags('account/details')
@Controller('account/details')
export class AccountDetailsController {
  constructor(private accountDetailsService: AccountDetailsService) {}

  @Get()
  @Secured()
  @ApiNotFoundResponse({
    description:
      "Account details not found for this account. Probably details wasn't set.",
  })
  @ApiOkResponse({
    type: AccountDetails,
    description:
      'Return account details, if not assigned empty map will be returned',
  })
  async get(@CurrentAccount() account: Account): Promise<AccountDetails> {
    return await this.accountDetailsService.get(account.id);
  }

  @ApiCreatedResponse({
    type: AccountDetails,
    description: 'Updated product successfully',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description: 'Body does not match defined schema',
  })
  @ApiNotFoundResponse()
  @Secured()
  @Patch()
  async patch(
    @CurrentAccount() account,
    @Body() accountDetailsDto: AccountDetailsDto,
  ): Promise<AccountDetails> {
    return await this.accountDetailsService.patch(
      account.id,
      accountDetailsDto,
    );
  }
}
