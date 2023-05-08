import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Patch,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserDetailsService } from '../services/user_details.service';
import { UserDetailsDto } from '../dto/user_details.dto';
import { UserDetails } from '../models/user_details.model';
import { Secured } from 'src/auth/decorators/secured.decorator';
import { CardDetailsDto } from '../../card_details/dto/card_details.dto';

import { CurrentAccount } from 'src/accounts/decorators/account.decorator';
import { Account } from 'src/accounts/model/account.model';
import { CardDetails } from 'src/card_details/models/card_details.model';

@ApiTags('user-details')
@Controller('user-details')
export class UserDetailsController {
  constructor(private userDetailsService: UserDetailsService) {}

  @ApiCreatedResponse({
    type: UserDetails,
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
    @Body() userDetailsDto: UserDetailsDto,
  ): Promise<Account> {
    return await this.userDetailsService.patch(account.id, userDetailsDto);
  }

  @ApiCreatedResponse({
    type: String,
    description: 'Updated user card-details successfully',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description: 'Body does not match defined schema',
  })
  @ApiNotFoundResponse()
  @Secured()
  @Patch('/:id/card-details')
  async patchCardDetails(
    @Param('id') id: number,
    @Body() cardDetailsDto: CardDetailsDto,
  ): Promise<CardDetails> {
    return await this.userDetailsService.patchCardDetails(id, cardDetailsDto);
  }
}
