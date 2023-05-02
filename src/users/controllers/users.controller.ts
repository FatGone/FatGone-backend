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
import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/user.dto';
import { User } from '../models/user.model';
import { Secured } from 'src/auth/decorators/secured.decorator';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiCreatedResponse({
    type: User,
    description: 'Updated product successfully',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description: 'Body does not match defined schema',
  })
  @ApiNotFoundResponse()
  @Secured()
  @Patch('/:id')
  async patch(
    @Param('id') id: number,
    @Body() userDto: UserDto,
  ): Promise<User> {
    return await this.usersService.patch(id, userDto);
  }
}
