import { AccountService } from './services/account.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './model/account.model';
import { AccountController } from './controllers/account.controller';
import { AccountDetails } from 'src/account_details/models/account_details.model';
import { Card } from 'src/card/models/card.model';

@Module({
  imports: [TypeOrmModule.forFeature([Account, Card, AccountDetails])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
