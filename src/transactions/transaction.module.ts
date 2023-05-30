import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './models/transaction.model';
import { TransactionService } from './services/transaction.service';
import { TransactionController } from './controllers/transactions.controller';
import { AccountModule } from 'src/accounts/account.module';
import { AccountDetailsModule } from 'src/account_details/account_details.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Transaction]),
    forwardRef(() => AccountModule),
    forwardRef(() => AccountDetailsModule),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class TransactionModule {}
