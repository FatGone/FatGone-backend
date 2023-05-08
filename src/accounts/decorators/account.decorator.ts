import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Account } from 'src/auth/accounts/model/account.model';

export const CurrentAccount = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as Account;
  },
);
