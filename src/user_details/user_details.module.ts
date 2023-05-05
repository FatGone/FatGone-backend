import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Favourites } from 'src/favourites/models/favourites.model';
import { UserDetails } from './models/user_details.model';
import { UserDetailsService } from './services/user_details.service';
import { UserDetailsController } from './controllers/user_details.controller';
import { CardDetails } from 'src/payments/models/card_details.model';
import { Account } from 'src/auth/accounts/model/account.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserDetails, CardDetails, Account]),
    // TypeOrmModule.forFeature([Favourites]),
  ],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
  exports: [UserDetailsService],
})
export class UserDetailsModule {}
