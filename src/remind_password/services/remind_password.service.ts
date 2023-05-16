import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';

@Injectable()
export class RemindPasswordService {
  constructor(private remindPasswordService: RemindPasswordService) {}
}
