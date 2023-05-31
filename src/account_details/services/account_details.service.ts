import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { AccountDetails } from '../models/account_details.model';
import { AccountDetailsDto } from '../dto/account_details.dto';
import { Account } from 'src/accounts/model/account.model';
import { AccountService } from 'src/accounts/services/account.service';

@Injectable()
export class AccountDetailsService {
  constructor(
    @InjectRepository(AccountDetails)
    private readonly accountDetailsRepository: Repository<AccountDetails>,
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
  ) {}

  async get(accountId: number): Promise<AccountDetails> {
    const account = await this.accountService.findById(accountId);
    if (account.accountDetails) {
      return account.accountDetails;
    } else {
      throw new NotFoundException();
    }
  }

  async patch(
    accountId: number,
    accountDetailsDto: AccountDetailsDto,
  ): Promise<Account> {
    const findAccount = await this.accountService.findById(accountId);

    if (findAccount != null) {
      const findAccountDetails = await this.accountDetailsRepository.findOne({
        where: { account: findAccount },
        relations: { card: true },
      });
      let accountDetails = new AccountDetails();
      if (findAccountDetails) {
        accountDetails = findAccountDetails;
      } else {
        accountDetails.card = null;
      }
      accountDetails.firstName = accountDetailsDto.firstName;
      accountDetails.lastName = accountDetailsDto.lastName;
      accountDetails.phoneNumber = accountDetailsDto.phoneNumber;
      accountDetails.street = accountDetailsDto.street;
      accountDetails.streetNumber = accountDetailsDto.streetNumber;
      accountDetails.flatNumber = accountDetailsDto.flatNumber;
      accountDetails.city = accountDetailsDto.city;
      accountDetails.postCode = accountDetailsDto.postCode;
      accountDetails.membershipTypeId = accountDetailsDto.membershipTypeId;

      const savedAccountDetails = await this.accountDetailsRepository.save(
        accountDetails,
      );
      findAccount.accountDetails = savedAccountDetails;
      return await this.accountService.patchAccount(findAccount);
    } else {
      throw new NotFoundException();
    }
  }
  async saveAccountDetails(
    accountDetails: AccountDetails,
  ): Promise<AccountDetails> {
    return await this.accountDetailsRepository.save(accountDetails);
  }

  async softRemove(accountDetailsId: number): Promise<void> {
    const accountDetails = await this.accountDetailsRepository.findOne({
      where: { id: accountDetailsId },
    });
    if (accountDetails) {
      await this.accountDetailsRepository.remove(accountDetails);
    }
  }
}
