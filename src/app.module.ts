import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UserDetails } from './user_details/models/user_details.model';
import { UserDetailsModule } from './user_details/user_details.module';
import { AuthModule } from './auth/auth.module';
import { CardDetails } from './payments/models/card_details.model';
import { AccountModule } from './auth/accounts/account.module';
import { Account } from './auth/accounts/model/account.model';

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
      entities: [Account, UserDetails, CardDetails],
      synchronize: true,
    }),
    AccountModule,
    AuthModule,
    UserDetailsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
