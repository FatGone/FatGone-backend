import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../models/transaction.model';
import { AccountService } from 'src/accounts/services/account.service';
import { AccountDetailsService } from 'src/account_details/services/account_details.service';
import { TransactionDto } from '../dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    @Inject(forwardRef(() => AccountDetailsService))
    private readonly accountDetailsService: AccountDetailsService,
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
  ) {}

  async findMultiple(accountId: number): Promise<Transaction[]> {
    const account = await this.accountService.findById(accountId);
    const accountDetails = account.accountDetails;
    const findTransactions = await this.transactionsRepository.find({
      where: { account_details: { id: accountDetails.id } },
    });
    if (findTransactions != null) {
      return findTransactions;
    } else {
      throw new NotFoundException();
    }
  }

  async create(
    accountId: number,
    transactionDto: TransactionDto,
  ): Promise<Transaction> {
    const account = await this.accountService.findById(accountId);
    const accountDetails = account.accountDetails;
    const transaction = new Transaction();
    transaction.price = transactionDto.price;
    transaction.lastCardDigits = transactionDto.lastCardDigits;
    transaction.title = transactionDto.title;
    transaction.account_details = accountDetails;
    return this.transactionsRepository.save(transaction);
  }
}
