import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountDetails } from './models/account_details.model';
import { AccountDetailsService } from './services/account_details.service';
import { AccountDetailsController } from './controllers/account_details.controller';
import { Account } from 'src/accounts/model/account.model';
import { Card } from 'src/card/models/card.model';

@Module({
  imports: [TypeOrmModule.forFeature([AccountDetails, Card, Account])],
  controllers: [AccountDetailsController],
  providers: [AccountDetailsService],
  exports: [AccountDetailsService],
})
export class AccountDetailsModule {}