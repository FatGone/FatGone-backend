import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './models/card.model';
import { CardController } from './controllers/card.controller';
import { CardService } from './services/card.service';
import { Account } from 'src/accounts/model/account.model';
import { AccountDetails } from 'src/account_details/models/account_details.model';
import { AccountService } from 'src/accounts/services/account.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountDetails, Card, Account])],
  controllers: [CardController],
  providers: [CardService, AccountService],
  exports: [CardService],
})
export class CardModule {}
