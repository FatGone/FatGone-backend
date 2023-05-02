import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { User } from '../models/user.model';
import { RegisterDto } from 'src/auth/models/register.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      // relations: { favourites: true },
    });
  }

  async findByEmailWithPassword(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const userInDb = await this.findByEmail(registerDto.email);
    if (userInDb) {
      throw new BadRequestException([
        'User with given email address already exists',
      ]);
    }
    const user = new User();
    user.email = registerDto.email;
    user.password = registerDto.password;
    return this.usersRepository.save(user);
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findOneBy({
      id: id,
    });
  }

  async patch(userId: number, userDto: UserDto): Promise<User> {
    const findUser = await this.usersRepository.findOneBy({
      id: userId,
    });

    if (findUser != null) {
      findUser.firstName = userDto.firstName;
      findUser.lastName = userDto.lastName;
      findUser.phoneNumber = userDto.phoneNumber;
      findUser.address = userDto.address;
      findUser.city = userDto.city;
      findUser.postCode = userDto.postCode;
      return await this.usersRepository.save(findUser);
    } else {
      throw new NotFoundException();
    }
  }
}
