import { Body, Controller, HttpCode, Query } from '@nestjs/common';
import { Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { jwtTokenDTO as jwtTokenDto } from '../models/jwt_token.dto';
import { LoginDTO as LoginDto } from '../models/login.dto';
import { RegisterDto } from '../models/register.dto';
import { AuthService } from '../services/auth.service';
import { RemindPasswordService } from 'src/remind_password/services/remind_password.service';
import { ChangePasswordDto } from '../models/change_password.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private remindPasswordService: RemindPasswordService,
  ) {}

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({
    type: jwtTokenDto,
    description: 'Account authenticated successfully.',
  })
  @ApiUnauthorizedResponse({ description: 'Email or password incorrect.' })
  async login(@Body() loginDto: LoginDto): Promise<jwtTokenDto> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  @ApiCreatedResponse({
    type: jwtTokenDto,
    description: 'Account registered successfully',
  })
  @ApiBadRequestResponse({ description: 'Body does not match defined schema' })
  @ApiBadRequestResponse({
    description: 'Account with specified email address already exists',
  })
  async register(@Body() registerDto: RegisterDto): Promise<jwtTokenDto> {
    return this.authService.register(registerDto);
  }

  @Post('password-remind')
  @ApiCreatedResponse({
    description: 'Password code reminder sent.',
  })
  @ApiBadRequestResponse({ description: 'Body does not match defined schema' })
  async remindPassword(@Query('email') email: string): Promise<void> {
    return this.remindPasswordService.remindPassword(email);
  }

  @Post('change-password')
  @ApiCreatedResponse({
    description: 'Password changed successfully.',
  })
  @ApiBadRequestResponse({ description: 'Body does not match defined schema.' })
  @ApiBadRequestResponse({ description: 'Invalid code.' })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    return await this.authService.changePassword(changePasswordDto);
  }
}
