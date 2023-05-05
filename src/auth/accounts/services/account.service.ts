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
    const userInDb = await this.findByEmail(registerDto.email);
    if (userInDb) {
      throw new BadRequestException([
        'User with given email address already exists',
      ]);
    }
    const account = new Account();
    account.email = registerDto.email;
    account.password = registerDto.password;
    account.userDetailsId = null;
    return this.accountRepository.save(account);
  }
  async findByEmail(email: string): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: { email },
      //   relations: { userDetailsId: true },
    });
  }
  async findByEmailWithPassword(email: string): Promise<Account | undefined> {
    return this.accountRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }
  async findById(id: number): Promise<Account> {
    return this.accountRepository.findOneBy({
      id: id,
    });
  }
}
