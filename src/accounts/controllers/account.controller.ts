import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccountService } from '../services/account.service';
import { Secured } from 'src/auth/decorators/secured.decorator';
import { CurrentAccount } from '../decorators/account.decorator';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Secured()
  @HttpCode(200)
  @Get('me')
  me(@CurrentAccount() account): any {
    return account;
  }
}
