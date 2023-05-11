import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtTokenDTO } from '../models/jwt_token.dto';
import { JwtPayload } from '../models/jwt_payload.dto';
import { RegisterDto } from '../models/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<jwtTokenDTO> {
    const user = await this.usersService.findByEmailWithPassword(email);
    if (user && (await compare(password, user.password))) {
      const payload = new JwtPayload(user.email, user.id);
      const token = this.jwtService.sign({ payload });
      return new jwtTokenDTO(token);
    }
    throw new UnauthorizedException();
  }

  async register(registerDto: RegisterDto): Promise<jwtTokenDTO> {
    const plainPassword = registerDto.password;
    registerDto.password = await hash(registerDto.password, 11);
    await this.usersService.create(registerDto);
    return this.login(registerDto.email, plainPassword);
  }
}
