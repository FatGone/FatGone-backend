import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from '../models/club.model';
import { ClubDto } from '../models/club.dto';

@Injectable()
export class ClubService {
  constructor(
    @InjectRepository(Club)
    private readonly clubRepository: Repository<Club>,
  ) {}
  async get(): Promise<Club[]> {
    return await this.clubRepository.find();
  }
  async add(clubDto: ClubDto): Promise<Club> {
    const club = new Club();
    club.address = clubDto.address;
    club.city = clubDto.city;
    club.postCode = clubDto.postCode;
    return await this.clubRepository.save(club);
  }
}
