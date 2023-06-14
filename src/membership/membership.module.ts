import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientMembership } from './models/client_membership.model';
import { MembershipType } from './models/membership_type.model';
import { Module, forwardRef } from '@nestjs/common';
import { AccountModule } from 'src/accounts/account.module';
import { MembershipController } from './controllers/membership.controller';
import { MembershipService } from './services/membership.service';
import { AccountDetailsModule } from 'src/account_details/account_details.module';
import { SendGridModule } from 'src/sendgrid/sendgrid.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClientMembership, MembershipType]),
    forwardRef(() => AccountModule),
    forwardRef(() => AccountDetailsModule),
    forwardRef(() => SendGridModule),
  ],
  controllers: [MembershipController],
  providers: [MembershipService],
  exports: [MembershipService],
})
export class MembershipModule {}
