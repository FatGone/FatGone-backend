import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { PassportModule } from '@nestjs/passport';
import { AccountDetailsModule } from 'src/account_details/account_details.module';

import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './services/auth.service';
import { AccountModule } from 'src/accounts/account.module';
import { SendGridModule } from 'src/sendgrid/sendgrid.module';
import { RemindPasswordModule } from 'src/remind_password/remind_password.module';
import { MembershipModule } from 'src/membership/membership.module';

@Module({
  imports: [
    AccountModule,
    AccountDetailsModule,
    PassportModule,
    forwardRef(() => SendGridModule),
    forwardRef(() => RemindPasswordModule),
    forwardRef(() => MembershipModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '30 days' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
