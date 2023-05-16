import { Module } from '@nestjs/common';
import { RemindPassword } from './models/remind_password.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RemindPasswordService } from './services/remind_password.service';

@Module({
  imports: [TypeOrmModule.forFeature([RemindPassword])],
  controllers: [],
  providers: [RemindPasswordService],
  exports: [RemindPasswordService],
})
export class RemindPasswordModule {}
