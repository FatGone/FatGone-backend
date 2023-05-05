import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: Repository<undefined>) {}
}
