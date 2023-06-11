import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AccountDetails } from './account_details/models/account_details.model';
import { AccountDetailsModule } from './account_details/account_details.module';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './accounts/account.module';
import { Account } from './accounts/model/account.model';
import { Card } from './card/models/card.model';
import { CardModule } from './card/card.module';
import { SendGridModule } from './sendgrid/sendgrid.module';
import { RemindPassword } from './remind_password/models/remind_password.model';
import { Club } from './club/models/club.model';
import { ClubModule } from './club/club.module';
import { ScheduleEvent } from './schedule_events/models/schedule_event.model';
import { TimetableModule } from './timetable/timetable.module';
import { ScheduleEventModule } from './schedule_events/schedule_event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [
        Account,
        AccountDetails,
        Card,
        RemindPassword,
        Club,
        ScheduleEvent,
      ],
      synchronize: true,
    }),
    AccountModule,
    AuthModule,
    AccountDetailsModule,
    CardModule,
    SendGridModule,
    ClubModule,
    ScheduleEventModule,
    TimetableModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
