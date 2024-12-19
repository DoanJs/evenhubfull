import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Position } from './Position.model';

@Injectable()
export class PositionsService {
  constructor(
    @InjectRepository(Position)
    private positionRepository: Repository<Position>,
  ) {}

  positions(): Promise<Position[]> {
    return this.positionRepository.query('select * from Positions');
  }

  // relation
}
