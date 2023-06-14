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
import { SendGridService } from 'src/sendgrid/services/sendgrid.service';

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
    @Inject(forwardRef(() => SendGridService))
    private readonly sendGridService: SendGridService,
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
      let clientMembership = new ClientMembership();
      if (account.accountDetails.clientMembership) {
        clientMembership = account.accountDetails.clientMembership;
      }
      clientMembership.freezed = false;
      clientMembership.joinedAt = DateTime.now().toISO();
      clientMembership.nextPayment = DateTime.now().plus({ days: 30 }).toISO();
      const membershipType = await this.membershipTypeRepository.findOne({
        where: { id: membershipTypeId },
      });
      if (membershipType) {
        clientMembership.price = membershipType.price;
        clientMembership.membershipType = membershipType;
        let savedClientMembership = clientMembership;
        console.log(
          'account.accountDetails.clientMembership: ' +
            account.accountDetails.clientMembership,
        );

        if (account.accountDetails.clientMembership) {
          await this.clientMembershipRepository.update(
            { id: account.accountDetails.clientMembership.id },
            clientMembership,
          );
        } else {
          savedClientMembership = await this.clientMembershipRepository.save(
            clientMembership,
          );
        }
        accountDetails.clientMembership = savedClientMembership;
        const response = await this.accountDetailsService.saveAccountDetails(
          accountDetails,
        );
        if (response) {
          return savedClientMembership;
        }
      }
    }
    throw new NotFoundException();
  }
  async findById(membershipTypeId: number): Promise<MembershipType> {
    return this.membershipTypeRepository.findOne({
      where: { id: membershipTypeId },
    });
  }

  async toggleFreeze(accountId: number): Promise<void> {
    const account = await this.accountService.findById(accountId);
    if (account) {
      const clientMembership = account.accountDetails.clientMembership;
      clientMembership.freezed = !clientMembership.freezed;

      const date = new Date(clientMembership.nextPayment);
      const now = new Date();
      const diff = this._getDayDiff(now, date);
      clientMembership.remainingDays = diff;
      await this.clientMembershipRepository.update(
        { id: clientMembership.id },
        clientMembership,
      );
    }
  }
  _getDayDiff(startDate: Date, endDate: Date): number {
    const msInDay = 24 * 60 * 60 * 1000;

    return Math.round(Math.abs(Number(endDate) - Number(startDate)) / msInDay);
  }
  async cancel(accountId: number): Promise<void> {
    const account = await this.accountService.findById(accountId);
    if (account) {
      const clientMembership = account.accountDetails.clientMembership;
      await this.clientMembershipRepository.remove(clientMembership);
    }
  }
  async fingerPrintReset(email: string): Promise<void> {
    this.sendGridService.sendFingerprintResetMail(email);
  }
}
