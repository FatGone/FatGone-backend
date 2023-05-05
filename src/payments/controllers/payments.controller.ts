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
import { Secured } from 'src/auth/decorators/secured.decorator';
import { PaymentsService } from '../services/payments.service';

@ApiTags('card-details')
@Controller('card-details')
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  // @ApiCreatedResponse({
  //   type: String,
  //   description: 'Updated user card details successfully',
  // })
  // @ApiBadRequestResponse({
  //   type: BadRequestException,
  //   description: 'Body does not match defined schema',
  // })
  // @ApiNotFoundResponse()
  // @Secured()
  // @Patch('/:id')
  // async patch(
  //   @Param('id') id: number,
  //   @Body() userDto: UserDto,
  // ): Promise<string> {
  //   return await this.usersService.patchCardDetails(id, userDto);
  // }
}
