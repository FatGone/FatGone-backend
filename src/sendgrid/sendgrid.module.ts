import { Module } from '@nestjs/common';
import { SendGridService } from './services/sendgrid.service';

@Module({
  imports: [],
  controllers: [],
  providers: [SendGridService],
  exports: [SendGridService],
})
export class SendGridModule {}
