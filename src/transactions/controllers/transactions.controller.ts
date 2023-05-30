import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../models/transaction.model';
import { Secured } from 'src/auth/decorators/secured.decorator';
import { CurrentAccount } from 'src/accounts/decorators/account.decorator';
import { Account } from 'src/accounts/model/account.model';
import { TransactionDto } from '../dto/transaction.dto';

@ApiTags('account/transactions')
@Controller('account/transactions')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  @Secured()
  @ApiNotFoundResponse({
    description: 'Transactions not found for this account.',
  })
  @ApiOkResponse({
    type: [Transaction],
    description: 'Return all user transactions',
  })
  async get(@CurrentAccount() account: Account): Promise<Transaction[]> {
    return await this.transactionService.findMultiple(account.id);
  }

  @Post()
  @Secured()
  @ApiCreatedResponse({
    type: Transaction,
    description: 'Added new transaction',
  })
  @ApiBadRequestResponse({
    type: BadRequestException,
    description: 'Body does not match defined schema',
  })
  async create(
    @CurrentAccount() account: Account,
    @Body() transactionDto: TransactionDto,
  ): Promise<Transaction> {
    return await this.transactionService.create(account.id, transactionDto);
  }
}
