import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './models/card.model';
import { CardController } from './controllers/card.controller';
import { CardService } from './services/card.service';
import { AccountModule } from 'src/accounts/account.module';
import { AccountDetailsModule } from 'src/account_details/account_details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card]),
    AccountModule,
    AccountDetailsModule,
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
