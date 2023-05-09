import { AccountService } from './services/account.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountDetails } from 'src/account_details/models/account_details.model';
import { Account } from './model/account.model';

@Module({
  imports: [TypeOrmModule.forFeature([Account, AccountDetails])],
  controllers: [],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
