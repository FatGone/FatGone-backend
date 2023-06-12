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

  async update(
    accountId: number,
    accountDetailsDto: AccountDetailsDto,
  ): Promise<AccountDetails> {
    const findAccount = await this.accountService.findById(accountId);

    if (findAccount != null) {
      const findAccountDetails = await this.accountDetailsRepository.findOne({
        where: { account: { id: findAccount.id } },
        relations: { card: true },
      });
      let accountDetails = new AccountDetails();
      if (findAccountDetails != null) {
        accountDetails = findAccountDetails.copyWithDto(accountDetailsDto);
        await this.accountDetailsRepository.update(
          findAccountDetails.id,
          accountDetails,
        );
      } else {
        accountDetails = new AccountDetails().copyWithDto(accountDetailsDto);
        await this.accountDetailsRepository.save(accountDetails);
      }
      findAccount.accountDetails = accountDetails;
      await this.accountService.updateAccount(findAccount);
      return accountDetails;
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
