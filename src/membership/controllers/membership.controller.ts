import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Secured } from 'src/auth/decorators/secured.decorator';
import { MembershipsService } from '../services/membeships.service';
import { ClientMembership } from '../models/client_memberships.model';

@ApiTags('account/membership')
@Controller('account/membership')
export class MembershipsController {
  constructor(private membershipsService: MembershipsService) {}

  @Post()
  @Secured()
  @ApiCreatedResponse({
    type: ClientMembership,
    description: 'Added new membership',
  })
  async add(@Body() membershipTypeId: number): Promise<ClientMembership> {
    return await this.membershipsService.add(membershipTypeId);
  }

  @Patch()
  @Secured()
  @ApiCreatedResponse({
    type: ClientMembership,
    description: 'Updated membership successfully',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description: 'Body does not match defined schema',
  })
  @ApiNotFoundResponse()
  async patch(@Body() membershipTypeId: number): Promise<ClientMembership> {
    return await this.membershipsService.add(membershipTypeId);
  }

  @Delete()
  @Secured()
  @ApiCreatedResponse({
    type: ClientMembership,
    description: 'Updated membership successfully',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description: 'Body does not match defined schema',
  })
  @ApiNotFoundResponse()
  async delete(@Body() membershipTypeId: number): Promise<void> {
    return await this.membershipsService.delete(membershipTypeId);
  }
}
