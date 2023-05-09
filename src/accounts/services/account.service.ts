import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from 'src/auth/models/register.dto';
import { Repository } from 'typeorm';
import { Account } from '../model/account.model';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
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

  async patchAccount(account: Account): Promise<Account> {
    return this.accountRepository.save(account);
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
    return this.accountRepository.findOne({
      where: { id: id },
      relations: { accountDetails: true },
    });
  }
}
