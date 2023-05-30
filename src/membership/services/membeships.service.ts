import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ClientMembership } from '../models/client_memberships.model';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(ClientMembership)
    private readonly membershipsRepository: Repository<ClientMembership>,
  ) {}

  async get(membershipId: number): Promise<ClientMembership> {
    const findMembership = await this.membershipsRepository.findOneBy({
      id: membershipId,
    });
    if (findMembership != null) {
      return findMembership;
    } else {
      throw new NotFoundException();
    }
  }

  async add(membershipTypeId: number): Promise<ClientMembership> {
    const membership = new ClientMembership();
    membership.membershipTypeId = membershipTypeId;
    membership.freezed = false;
    membership.nextPayment = membership.joinedAt;
    // membership.price = membership.membershipTypeId.price;
    return await this.membershipsRepository.save(membership);
  }

  async freeze(membershipId: number): Promise<ClientMembership> {
    const findMembership = await this.membershipsRepository.findOneBy({
      id: membershipId,
    });
    if (findMembership != null) {
      if (!findMembership.freezed) findMembership.freezed = true;
      return await this.membershipsRepository.save(findMembership);
    } else {
      throw new NotFoundException();
    }
  }

  async unfreeze(membershipId: number): Promise<ClientMembership> {
    const findMembership = await this.membershipsRepository.findOneBy({
      id: membershipId,
    });
    if (findMembership != null) {
      if (findMembership.freezed) findMembership.freezed = false;
      return await this.membershipsRepository.save(findMembership);
    } else {
      throw new NotFoundException();
    }
  }

  async delete(membershipId: number): Promise<void> {
    const findMembership = await this.membershipsRepository.findOneBy({
      id: membershipId,
    });
    if (findMembership != null) {
      await this.membershipsRepository.remove(findMembership);
    } else {
      throw new NotFoundException();
    }
  }
}
