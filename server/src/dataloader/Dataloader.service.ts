import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as DataLoader from 'dataloader';
import { User } from 'src/users';
import { Repository } from 'typeorm';

@Injectable()
export class DataLoaderService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public readonly loaderUser = new DataLoader((ids: number[]) => {
    const result = ids.map(async (id) => {
      const response = await this.userRepository.query(
        `select * from Users where UserID = ${id}`,
      );
      return response[0];
    });
    return Promise.resolve(result);
  });
}
