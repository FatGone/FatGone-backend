import { BadRequestException, Body, Controller, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CardDetailsService } from '../services/card_details.service';
import { Secured } from 'src/auth/decorators/secured.decorator';
import { CurrentAccount } from 'src/accounts/decorators/account.decorator';
import { CardDetailsDto } from 'src/card_details/dto/card_details.dto';
import { UserDetails } from 'src/user_details/models/user_details.model';

@ApiTags('card-details')
@Controller('card-details')
export class CardDetailsController {
  constructor(private cardDetailsService: CardDetailsService) {}

  @ApiCreatedResponse({
    type: String,
    description: 'Updated user card details successfully',
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
    @Body() cardDetailsDto: CardDetailsDto,
  ): Promise<UserDetails> {
    return await this.cardDetailsService.patch(account.id, cardDetailsDto);
  }
}
