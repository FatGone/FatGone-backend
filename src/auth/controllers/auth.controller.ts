import { Body, Controller, HttpCode } from '@nestjs/common';
import {
  Get,
  Post,
} from '@nestjs/common/decorators/http/request-mapping.decorator';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../../users/decorators/user.decorator';
import { Secured } from '../decorators/secured.decorator';
import { jwtTokenDTO as jwtTokenDto } from '../models/jwt_token.dto';
import { LoginDTO as LoginDto } from '../models/login.dto';
import { RegisterDto } from '../models/register.dto';
import { AuthService } from '../services/auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOkResponse({
    type: jwtTokenDto,
    description: 'user authenticated successfully',
  })
  @ApiUnauthorizedResponse({ description: 'invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<jwtTokenDto> {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('register')
  @ApiCreatedResponse({
    type: jwtTokenDto,
    description: 'user registered successfully',
  })
  @ApiBadRequestResponse({ description: 'Body does not match defined schema' })
  @ApiBadRequestResponse({
    description: 'User with specified email address already exists',
  })
  async register(@Body() registerDto: RegisterDto): Promise<jwtTokenDto> {
    return this.authService.register(registerDto);
  }

  @Secured()
  @Get('me')
  me(@CurrentUser() user): any {
    return user;
  }
}
