import { Module, forwardRef } from '@nestjs/common';
import { RemindPassword } from './models/remind_password.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemindPasswordService } from './services/remind_password.service';
import { SendGridModule } from 'src/sendgrid/sendgrid.module';
import { AccountModule } from 'src/accounts/account.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RemindPassword]),
    forwardRef(() => SendGridModule),
    forwardRef(() => AccountModule),
  ],
  controllers: [],
  providers: [RemindPasswordService],
  exports: [RemindPasswordService],
})
export class RemindPasswordModule {}
