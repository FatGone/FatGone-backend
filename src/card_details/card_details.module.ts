import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardDetails } from './models/card_details.model';
import { CardDetailsController } from './controllers/card_details.controller';
import { CardDetailsService } from './services/card_details.service';
import { Account } from 'src/accounts/model/account.model';
import { UserDetails } from 'src/user_details/models/user_details.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetails, CardDetails, Account])],
  controllers: [CardDetailsController],
  providers: [CardDetailsService],
  exports: [CardDetailsService],
})
export class CardDetailsModule {}
