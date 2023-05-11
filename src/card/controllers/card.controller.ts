import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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
import { CardService } from '../services/card.service';
import { Secured } from 'src/auth/decorators/secured.decorator';
import { CurrentAccount } from 'src/accounts/decorators/account.decorator';
import { CardDto } from 'src/card/dto/card.dto';
import { AccountDetails } from 'src/account_details/models/account_details.model';
import { Card } from '../models/card.model';
import { Account } from 'src/accounts/model/account.model';

@ApiTags('account/card')
@Controller('account/card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  @Secured()
  @ApiNotFoundResponse({
    description:
      "Card details not found for this account. Probably card wasn't set.",
  })
  @ApiOkResponse({
    type: AccountDetails,
    description: 'Return account details.',
  })
  async get(@CurrentAccount() account: Account): Promise<Card> {
    return await this.cardService.get(account.id);
  }

  @ApiCreatedResponse({
    type: String,
    description: 'Updated account card successfully.',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description: 'Body does not match defined schema.',
  })
  @ApiNotFoundResponse()
  @Secured()
  @Patch()
  async patch(
    @CurrentAccount() account,
    @Body() cardDto: CardDto,
  ): Promise<Card> {
    return await this.cardService.patch(account.id, cardDto);
  }

  @ApiCreatedResponse({
    description: 'Card was removed successfully',
  })
  @ApiNotFoundResponse({
    description: 'Card not found.',
  })
  @Secured()
  @Delete()
  async delete(@CurrentAccount() account: Account): Promise<void> {
    return await this.cardService.remove(account.id);
  }
}
