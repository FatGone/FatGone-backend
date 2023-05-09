import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './models/card.model';
import { CardController } from './controllers/card.controller';
import { CardService } from './services/card.service';
import { Account } from 'src/accounts/model/account.model';
import { AccountDetails } from 'src/account_details/models/account_details.model';

@Module({
  imports: [TypeOrmModule.forFeature([AccountDetails, Card, Account])],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
