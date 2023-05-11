import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountDetails } from './models/account_details.model';
import { AccountDetailsService } from './services/account_details.service';
import { AccountDetailsController } from './controllers/account_details.controller';
import { AccountModule } from 'src/accounts/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountDetails]),
    forwardRef(() => AccountModule),
  ],
  controllers: [AccountDetailsController],
  providers: [AccountDetailsService],
  exports: [AccountDetailsService],
})
export class AccountDetailsModule {}
