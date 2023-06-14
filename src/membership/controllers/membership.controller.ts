import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MembershipService } from '../services/membership.service';
import { ClientMembership } from '../models/client_membership.model';
import { CurrentAccount } from 'src/accounts/decorators/account.decorator';
import { Account } from 'src/accounts/model/account.model';
import { Secured } from 'src/auth/decorators/secured.decorator';

@ApiTags('membership')
@Controller('membership')
export class MembershipController {
  constructor(private membershipService: MembershipService) {}

  @Get()
  @Secured()
  @ApiNotFoundResponse({
    description: 'Client membership not found for this account.',
  })
  @ApiOkResponse({
    type: ClientMembership,
    description: 'Return client membership info.',
  })
  async get(@CurrentAccount() account: Account): Promise<ClientMembership> {
    return await this.membershipService.get(account.id);
  }

  @Post('/set-membership/:membershipTypeId')
  @Secured()
  @ApiNotFoundResponse({
    description: 'Account not found.',
  })
  @ApiOkResponse({
    type: ClientMembership,
    description: 'Set client membership info.',
  })
  async setMembership(
    @CurrentAccount() account: Account,
    @Param('membershipTypeId') membershipTypeId: number,
  ): Promise<ClientMembership> {
    return await this.membershipService.setMembership(
      account.id,
      membershipTypeId,
    );
  }
  @Post('/freeze')
  @Secured()
  @ApiNotFoundResponse({
    description: 'Account not found.',
  })
  async freeze(@CurrentAccount() account: Account): Promise<void> {
    await this.membershipService.toggleFreeze(account.id);
  }
  @Post('/cancel')
  @Secured()
  @ApiNotFoundResponse({
    description: 'Account not found.',
  })
  async cancel(@CurrentAccount() account: Account): Promise<void> {
    await this.membershipService.cancel(account.id);
  }
  @Post('/finger-print-reset')
  @Secured()
  @ApiNotFoundResponse({
    description: 'Account not found.',
  })
  async fingerPrintReset(@CurrentAccount() account: Account): Promise<void> {
    await this.membershipService.fingerPrintReset(account.email);
  }
}
