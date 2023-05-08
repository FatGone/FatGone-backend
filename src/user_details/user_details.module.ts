import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { Favourites } from 'src/favourites/models/favourites.model';
import { UserDetails } from './models/user_details.model';
import { UserDetailsService } from './services/user_details.service';
import { UserDetailsController } from './controllers/user_details.controller';
import { Account } from 'src/accounts/model/account.model';
import { CardDetails } from 'src/card_details/models/card_details.model';

@Module({
  imports: [TypeOrmModule.forFeature([UserDetails, CardDetails, Account])],
  controllers: [UserDetailsController],
  providers: [UserDetailsService],
  exports: [UserDetailsService],
})
export class UserDetailsModule {}
