import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/models/register.dto';
import { Repository } from 'typeorm';
import { Account } from '../model/account.model';
import { CardService } from 'src/card/services/card.service';
import { AccountDetailsService } from 'src/account_details/services/account_details.service';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @Inject(forwardRef(() => CardService))
    private cardService: CardService,
    @Inject(forwardRef(() => AccountDetailsService))
    private accountDetailsService: AccountDetailsService,
  ) {}

  async create(registerDto: RegisterDto): Promise<Account> {
    const accountInDb = await this.findByEmail(registerDto.email);
    if (accountInDb) {
      throw new BadRequestException([
        'Account with given email address already exists',
      ]);
    }
    const account = new Account();
    account.email = registerDto.email;
    account.password = registerDto.password;
    account.accountDetails = null;
    return this.accountRepository.save(account);
  }

  async updateAccount(account: Account): Promise<Account> {
    await this.accountRepository.update({ id: account.id }, account);
    return this.findById(account.id);
  }
  async findByEmail(email: string): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: { email },
      relations: { accountDetails: true },
    });
  }
  async findByEmailWithPassword(email: string): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
      relations: { accountDetails: true },
    });
  }
  async findById(id: number): Promise<Account> {
    return await this.accountRepository.findOne({
      where: { id: id },
      relations: { accountDetails: true },
    });
  }
  async delete(accountId: number): Promise<void> {
    const account = await this.findById(accountId);
    if (account) {
      if (account.accountDetails.card) {
        await this.cardService.softRemove(account.id);
      }
      if (account.accountDetails) {
        await this.accountDetailsService.softRemove(account.accountDetails.id);
      }
      await this.accountRepository.remove(account);
    } else {
      throw new NotFoundException();
    }
  }
}
