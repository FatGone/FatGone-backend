import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Card as Card } from '../models/card.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CardDto } from 'src/card/dto/card.dto';
import { AccountService } from 'src/accounts/services/account.service';
import { AccountDetailsService } from 'src/account_details/services/account_details.service';
import { DateTime } from 'luxon';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
    @Inject(forwardRef(() => AccountDetailsService))
    private readonly accountDetailsService: AccountDetailsService,
    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
  ) {}

  async get(accountId: number): Promise<Card> {
    const account = await this.accountService.findById(accountId);
    console.log('account.accountDetails.card: ' + account.accountDetails.card);
    if (account.accountDetails && account.accountDetails.card) {
      return account.accountDetails.card;
    } else {
      throw new NotFoundException();
    }
  }

  async patch(accountId: number, cardDto: CardDto): Promise<Card> {
    const account = await this.accountService.findById(accountId);
    if (account != null) {
      const accountDetails = account.accountDetails;
      const card = new Card();
      card.cardNumber = cardDto.cardNumber;
      card.cvvNumber = cardDto.cvvNumber;
      const expiryDate = DateTime.fromISO(cardDto.expiryDate);
      card.expiryDate = expiryDate.toSQLDate();

      card.cardHolder = cardDto.cardHolder;
      accountDetails.card = card;
      const cardResponse = await this.cardRepository.save(card);
      await this.accountDetailsService.saveAccountDetails(accountDetails);
      return cardResponse;
    } else {
      throw new NotFoundException();
    }
  }
  async remove(accountId: number): Promise<void> {
    const account = await this.accountService.findById(accountId);
    if (account.accountDetails && account.accountDetails.card) {
      await this.cardRepository.remove(account.accountDetails.card);
    } else {
      throw new NotFoundException();
    }
  }
  async softRemove(accountId: number): Promise<void> {
    const account = await this.accountService.findById(accountId);
    if (account.accountDetails && account.accountDetails.card) {
      await this.cardRepository.remove(account.accountDetails.card);
    }
  }
}
