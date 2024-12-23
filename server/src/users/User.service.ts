import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '.';
import { EventFollowerInput } from './type/event_follower.input';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  users(): Promise<User[]> {
    return this.userRepository.query('select * from Users');
  }

  async user(email: string): Promise<User> {
    const data = await this.userRepository.query(
      `select * from Users where Email = '${email}'`,
    );
    return data[0];
  }

  async editEventFollower(
    eventFollowerInput: EventFollowerInput,
  ): Promise<String> {
    const { type, UserID, EventID } = eventFollowerInput;
    try {
      if (type === 'delete') {
        await this.userRepository.query(`
      delete from Events_Followers where UserID = ${UserID} and EventID =${EventID}
      `);
      } else {
        await this.userRepository.query(`
      insert into Events_Followers (UserID, EventID) values (${UserID}, ${EventID})
      `);
      }

      return type === 'insert'
        ? 'Update follower completed !'
        : 'Delete follower completed !';
    } catch (error) {
      throw new UnauthorizedException('Delete/update follower error !');
    }
  }

  // relation
  async user_followers(UserID: number): Promise<Event[]> {
    return this.userRepository.query(`
  select Events.* from Events 
    inner join Events_Followers 
    on Events.EventID = Events_Followers.EventID 
    where Events_Followers.UserID = ${UserID}
  `);
  }
}
