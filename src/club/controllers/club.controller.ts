import { Body, Controller } from '@nestjs/common';
import {
  Get,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Secured } from 'src/auth/decorators/secured.decorator';
import { ClubDto } from '../models/club.dto';
import { Club } from '../models/club.model';
import { ClubService } from '../services/club.service';

@ApiTags('club')
@Controller('club')
export class ClubController {
  constructor(private clubService: ClubService) {}
  @Get()
  @ApiNotFoundResponse({
    description: 'Club not found.',
  })
  @ApiOkResponse({
    type: Club,
    description: 'Return Club.',
  })
  @Secured()
  async get(): Promise<Club[]> {
    return await this.clubService.get();
  }
  @Post()
  @ApiCreatedResponse({
    description: 'Club added successfully',
  })
  @ApiBadRequestResponse({ description: 'Body does not match defined schema' })
  @Secured()
  async add(@Body() clubDto: ClubDto): Promise<Club> {
    return await this.clubService.add(clubDto);
  }
}
