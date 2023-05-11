import { AccountService } from './services/account.service';
import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './model/account.model';
import { AccountController } from './controllers/account.controller';
import { CardModule } from 'src/card/card.module';
import { AccountDetailsModule } from 'src/account_details/account_details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    forwardRef(() => CardModule),
    forwardRef(() => AccountDetailsModule),
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
