import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardDetails } from './models/card_details.model';
import { PaymentsController } from './controllers/payments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CardDetails])],
  controllers: [PaymentsController],
  providers: [],
})
export class PaymentsModule {}
