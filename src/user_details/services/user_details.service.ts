import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { UserDetails } from '../models/user_details.model';
import { UserDetailsDto } from '../dto/user_details.dto';
import { CardDetailsDto } from '../dto/card_details.dto';
import { CardDetails } from 'src/payments/models/card_details.model';
import { Account } from 'src/auth/accounts/model/account.model';

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

  async patch(accountId: number, userDto: UserDetailsDto): Promise<Account> {
    const findAccount = await this.accountRepository.findOneBy({
      id: accountId,
    });

    if (findAccount != null) {
      const userDetails = new UserDetails();
      userDetails.firstName = userDto.firstName;
      userDetails.lastName = userDto.lastName;
      userDetails.phoneNumber = userDto.phoneNumber;
      userDetails.address = userDto.address;
      userDetails.city = userDto.city;
      userDetails.postCode = userDto.postCode;
      userDetails.cardDetailsId = null;
      const savedUserDetails = await this.userDetailsRepository.save(
        userDetails,
      );
      findAccount.userDetailsId = savedUserDetails.id;
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
        findUser.cardDetailsId = cardDetails.id;
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
