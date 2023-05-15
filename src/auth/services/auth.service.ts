import {
  Inject,
  Injectable,
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

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    @Inject(forwardRef(() => SendGridService))
    private readonly sendGridService: SendGridService,
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
    const plainPassword = registerDto.password;
    registerDto.password = await hash(registerDto.password, 11);
    const response = await this.accountService.create(registerDto);
    if (response) {
      const mail = {
        to: response.email,
        from: 'dominik.szpilski@edgarsz.pl',
        templateId: 'd-7d102b25cfb44207908a6c252e7e9b10',
      };
      await this.sendGridService.send(mail);
    }
    return this.login(registerDto.email, plainPassword);
  }
}
