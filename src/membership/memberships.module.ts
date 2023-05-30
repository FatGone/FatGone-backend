import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientMembership } from './models/client_memberships.model';
import { MembershipsController } from './controllers/membership.controller';
import { MembershipType } from './models/membership_types.model';
import { MembershipsService } from './services/membeships.service';

@Module({
  imports: [TypeOrmModule.forFeature([MembershipType, ClientMembership])],
  controllers: [MembershipsController],
  providers: [MembershipsService],
  exports: [MembershipsService],
})
export class MembershipModule {}
