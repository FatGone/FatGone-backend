import { BadRequestException, Body, Controller, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
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
  ): Promise<Account> {
    return await this.accountDetailsService.patch(
      account.id,
      accountDetailsDto,
    );
  }
}
