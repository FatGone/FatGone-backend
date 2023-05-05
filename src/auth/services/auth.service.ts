import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtTokenDTO } from '../models/jwt_token.dto';
import { JwtPayload } from '../models/jwt_payload.dto';
import { RegisterDto } from '../models/register.dto';
import { AccountService } from '../accounts/services/account.service';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<jwtTokenDTO> {
    const account = await this.accountService.findByEmailWithPassword(email);
    if (account && (await compare(password, account.password))) {
      const payload = new JwtPayload(account.email, account.id);
      const token = this.jwtService.sign({ payload });
      return new jwtTokenDTO(token);
    }
    throw new UnauthorizedException();
  }

  async register(registerDto: RegisterDto): Promise<jwtTokenDTO> {
    const plainPassword = registerDto.password;
    registerDto.password = await hash(registerDto.password, 11);
    await this.accountService.create(registerDto);
    return this.login(registerDto.email, plainPassword);
  }
}
