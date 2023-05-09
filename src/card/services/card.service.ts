import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card as Card } from '../models/card.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CardDto } from 'src/card/dto/card.dto';
import { Account } from 'src/accounts/model/account.model';
import { AccountDetails } from 'src/account_details/models/account_details.model';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(AccountDetails)
    private readonly accountDetailsRepository: Repository<AccountDetails>,
  ) {}

  async patch(accountId: number, cardDto: CardDto): Promise<AccountDetails> {
    const findAccount = await this.accountRepository.findOne({
      where: { id: accountId },
      relations: { accountDetails: true },
    });
    if (findAccount != null) {
      const accountDetails = findAccount.accountDetails;
      const card = new Card();
      card.cardNumber = cardDto.cardNumber;
      card.cvvNumber = cardDto.cvvNumber;
      card.expiryDate = cardDto.expiryDate;
      card.cardHolder = cardDto.cardHolder;
      accountDetails.card = card;
      return await this.accountDetailsRepository.save(accountDetails);
    } else {
      throw new NotFoundException();
    }
  }
}
