import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientMembership } from '../models/client_membership.model';
import { AccountService } from 'src/accounts/services/account.service';
import { DateTime } from 'luxon';
import { MembershipType } from '../models/membership_type.model';
import { AccountDetailsService } from 'src/account_details/services/account_details.service';

@Injectable()
export class MembershipService {
  constructor(
    @InjectRepository(ClientMembership)
    private readonly clientMembershipRepository: Repository<ClientMembership>,
    @InjectRepository(MembershipType)
    private readonly membershipTypeRepository: Repository<MembershipType>,

    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
    @Inject(forwardRef(() => AccountDetailsService))
    private readonly accountDetailsService: AccountDetailsService,
  ) {}

  async get(accountId: number): Promise<ClientMembership> {
    const account = await this.accountService.findById(accountId);
    if (account.accountDetails && account.accountDetails.clientMembership) {
      return account.accountDetails.clientMembership;
    } else {
      throw new NotFoundException();
    }
  }

  async setMembership(
    accountId: number,
    membershipTypeId: number,
  ): Promise<ClientMembership> {
    const account = await this.accountService.findById(accountId);
    if (account.accountDetails) {
      const accountDetails = account.accountDetails;
      const clientMembership = new ClientMembership();
      clientMembership.freezed = false;
      clientMembership.joinedAt = DateTime.now().toISO();
      clientMembership.nextPayment = DateTime.now().plus({ days: 30 }).toISO();
      const membershipType = await this.membershipTypeRepository.findOne({
        where: { id: membershipTypeId },
      });
      if (membershipType) {
        clientMembership.price = membershipType.price;
        clientMembership.membershipType = membershipType;

        const savedClientMembership =
          await this.clientMembershipRepository.save(clientMembership);
        if (savedClientMembership) {
          accountDetails.clientMembership = savedClientMembership;
          const response = await this.accountDetailsService.patch(
            account.id,
            accountDetails,
          );
          if (response) {
            return savedClientMembership;
          }
        }
      }
    }
    throw new NotFoundException();
  }
}
