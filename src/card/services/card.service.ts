import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card as Card } from '../models/card.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CardDto } from 'src/card/dto/card.dto';
import { AccountDetails } from 'src/account_details/models/account_details.model';
import { AccountService } from 'src/accounts/services/account.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(AccountDetails)
    private readonly accountDetailsRepository: Repository<AccountDetails>,
    private readonly accountService: AccountService,
  ) {}

  async patch(accountId: number, cardDto: CardDto): Promise<AccountDetails> {
    const findAccount = await this.accountService.findById(accountId);
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
