import { Injectable, NotFoundException } from '@nestjs/common';
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
    private readonly accountService: AccountService,
  ) {}

  async patch(
    accountId: number,
    accountDetailsDto: AccountDetailsDto,
  ): Promise<Account> {
    const findAccount = await this.accountService.findById(accountId);

    if (findAccount != null) {
      const accountDetails = new AccountDetails();
      accountDetails.firstName = accountDetailsDto.firstName;
      accountDetails.lastName = accountDetailsDto.lastName;
      accountDetails.phoneNumber = accountDetailsDto.phoneNumber;
      accountDetails.address = accountDetailsDto.address;
      accountDetails.city = accountDetailsDto.city;
      accountDetails.postCode = accountDetailsDto.postCode;
      accountDetails.card = null;
      const savedAccountDetails = await this.accountDetailsRepository.save(
        accountDetails,
      );
      findAccount.accountDetails = savedAccountDetails;
      return await this.accountService.patchAccount(findAccount);
    } else {
      throw new NotFoundException();
    }
  }
}
