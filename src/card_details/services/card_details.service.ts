import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CardDetails } from '../models/card_details.model';
import { InjectRepository } from '@nestjs/typeorm';
import { CardDetailsDto } from 'src/card_details/dto/card_details.dto';
import { Account } from 'src/accounts/model/account.model';
import { UserDetails } from 'src/user_details/models/user_details.model';

@Injectable()
export class CardDetailsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(UserDetails)
    private readonly userDetailsRepository: Repository<UserDetails>,
    @InjectRepository(CardDetails)
    private readonly cardDetailsRepository: Repository<CardDetails>,
  ) {}

  async patch(
    accountId: number,
    cardDetailsDto: CardDetailsDto,
  ): Promise<UserDetails> {
    const findAccount = await this.accountRepository.findOne({
      where: { id: accountId },
      relations: { userDetails: true },
    });
    if (findAccount != null) {
      const userDetails = findAccount.userDetails;
      const cardDetails = new CardDetails();
      cardDetails.cardNumber = cardDetailsDto.cardNumber;
      cardDetails.cvvNumber = cardDetailsDto.cvvNumber;
      cardDetails.expiryDate = cardDetailsDto.expiryDate;
      cardDetails.cardHolder = cardDetailsDto.cardHolder;
      userDetails.cardDetails = cardDetails;
      return await this.userDetailsRepository.save(userDetails);
    } else {
      throw new NotFoundException();
    }
  }
}
