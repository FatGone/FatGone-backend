import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDetails } from 'src/user_details/models/user_details.model';
import { Account } from './model/account.model';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account, UserDetails]),
    // TypeOrmModule.forFeature([Favourites]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
