import { BadRequestException, Body, Controller, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CardService } from '../services/card.service';
import { Secured } from 'src/auth/decorators/secured.decorator';
import { CurrentAccount } from 'src/accounts/decorators/account.decorator';
import { CardDto } from 'src/card/dto/card.dto';
import { AccountDetails } from 'src/account_details/models/account_details.model';

@ApiTags('account/card')
@Controller('account/card')
export class CardController {
  constructor(private cardService: CardService) {}

  @ApiCreatedResponse({
    type: String,
    description: 'Updated account card successfully',
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
    @Body() cardDto: CardDto,
  ): Promise<AccountDetails> {
    return await this.cardService.patch(account.id, cardDto);
  }
}
