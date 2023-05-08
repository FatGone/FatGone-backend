import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { UserDetails } from '../models/user_details.model';
import { UserDetailsDto } from '../dto/user_details.dto';
import { CardDetailsDto } from '../../card_details/dto/card_details.dto';
import { Account } from 'src/accounts/model/account.model';
import { CardDetails } from 'src/card_details/models/card_details.model';

@Injectable()
export class UserDetailsService {
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
    userDetailsDto: UserDetailsDto,
  ): Promise<Account> {
    const findAccount = await this.accountRepository.findOne({
      where: { id: accountId },
      relations: { userDetails: true },
    });

    if (findAccount != null) {
      const userDetails = new UserDetails();
      userDetails.firstName = userDetailsDto.firstName;
      userDetails.lastName = userDetailsDto.lastName;
      userDetails.phoneNumber = userDetailsDto.phoneNumber;
      userDetails.address = userDetailsDto.address;
      userDetails.city = userDetailsDto.city;
      userDetails.postCode = userDetailsDto.postCode;
      userDetails.cardDetails = null;
      const savedUserDetails = await this.userDetailsRepository.save(
        userDetails,
      );
      findAccount.userDetails = savedUserDetails;
      return await this.accountRepository.save(findAccount);
    } else {
      throw new NotFoundException();
    }
  }
  async patchCardDetails(
    accountId: number,
    cardDetailsDto: CardDetailsDto,
  ): Promise<CardDetails> {
    const findUser = await this.userDetailsRepository.findOneBy({
      id: accountId,
    });

    if (findUser != null) {
      const cardDetails = await this.cardDetailsRepository.save(cardDetailsDto);
      if (cardDetails) {
        findUser.cardDetails = cardDetails;
        const savedUser = await this.userDetailsRepository.save(findUser);
        if (savedUser) {
          return cardDetails;
        } else {
          throw new BadRequestException([
            'Something went wrong on saving user',
          ]);
        }
      } else {
        throw new BadRequestException([
          'CardDetails with given details cannot by saved',
        ]);
      }
    } else {
      throw new NotFoundException();
    }
  }
}
