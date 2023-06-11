import { Module } from '@nestjs/common';
import { ClubController } from './controllers/club.controller';
import { ClubService } from './services/club.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './models/club.model';

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  providers: [ClubService],
  controllers: [ClubController],
  exports: [ClubService],
})
export class ClubModule {}
