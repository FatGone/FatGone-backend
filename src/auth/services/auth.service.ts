import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtTokenDTO } from '../models/jwt_token.dto';
import { JwtPayload } from '../models/jwt_payload.dto';
import { RegisterDto } from '../models/register.dto';
import { AccountService } from 'src/accounts/services/account.service';
import { SendGridService } from 'src/sendgrid/services/sendgrid.service';
import { ChangePasswordDto } from '../models/change_password.dto';
import { RemindPasswordService } from 'src/remind_password/services/remind_password.service';
import { DateTime } from 'luxon';
import { ConfirmationMailDto } from '../models/confirmation_mail.dto';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => SendGridService))
    private readonly sendGridService: SendGridService,
    @Inject(forwardRef(() => RemindPasswordService))
    private readonly remindPasswordService: RemindPasswordService,
  ) {}

  async login(email: string, password: string): Promise<jwtTokenDTO> {
    const account = await this.accountService.findByEmailWithPassword(email);
    if (account && (await compare(password, account.password))) {
      const payload = new JwtPayload(account.email, account.id);
      const token = this.jwtService.sign({ payload });
      return new jwtTokenDTO(token);
    }
    throw new UnauthorizedException({
      message: 'Email or password incorrect.',
    });
  }

  async register(registerDto: RegisterDto): Promise<jwtTokenDTO> {
    console.log('[AuthService] register()');

    const plainPassword = registerDto.password;
    registerDto.password = await hash(registerDto.password, 11);
    const response = await this.accountService.create(registerDto);
    if (response) {
      await this.sendGridService.sendEmailConfirmationCode(
        '619741',
        response.email,
      );
    }
    return this.login(registerDto.email, plainPassword);
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
    const account = await this.accountService.findByEmail(
      changePasswordDto.email,
    );
    if (account) {
      const remindPassword = await this.remindPasswordService.findByAccountId(
        account.id,
      );
      if (
        remindPassword &&
        remindPassword.remindCode == changePasswordDto.code
      ) {
        const expiryDate = DateTime.fromISO(remindPassword.expiryDate);
        if (DateTime.now() < expiryDate) {
          changePasswordDto.password = await hash(
            changePasswordDto.password,
            11,
          );
          account.password = changePasswordDto.password;
          await this.remindPasswordService.deleteById(remindPassword.id);
          await this.accountService.patchAccount(account);
          return;
        } else {
          await this.remindPasswordService.deleteById(remindPassword.id);
          throw new BadRequestException();
        }
      } else {
        throw new NotFoundException();
      }
    }

    throw new NotFoundException();
  }
  async sendConfirmationMail(
    confirmationMailDto: ConfirmationMailDto,
  ): Promise<void> {
    await this.sendGridService.sendPostRegisterMail(confirmationMailDto.email);
    await this.sendGridService.sendPostPurchaseMail(
      confirmationMailDto.membershipType,
      confirmationMailDto.email,
    );
  }
}
