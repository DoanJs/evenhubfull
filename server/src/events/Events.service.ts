import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './';
import { EventInput } from './type/eventInput.dt';
import { User } from 'src/users';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  events(): Promise<Event[]> {
    return this.eventRepository.query('select * from Events');
  }

  async createEvent(eventinput: EventInput): Promise<Event> {
    const { users, ...data } = eventinput;
    const author = await this.eventRepository.query(
      `select * from Users where UserID = ${data.authorId}`,
    );
    const result = await this.eventRepository.create({
      ...data,
      author: author[0],
    });
    await this.eventRepository.save(result);
    console.log(eventinput)
    return result;
  }

  // relation
  async author(event: any): Promise<User> {
    if (event.authorId) {
      const result = await this.eventRepository.query(
        `select * from Users where UserID = ${event.authorId}`,
      );
      return result[0];
    } else {
      return null;
    }
  }
}
