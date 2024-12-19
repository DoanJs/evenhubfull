import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './';
import { EventInput } from './type/event.input';
import { User } from 'src/users';
import { Position } from 'src/positions/Position.model';

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
    const { users, position, ...data } = eventinput;
    const author = await this.eventRepository.query(
      `select * from Users where UserID = ${data.authorId}`,
    );
    const result = await this.eventRepository.create({
      ...data,
      author: author[0],
    });
    await this.eventRepository.save(result);

    const response = eventinput.users.map(async (userId: any) => {
      await this.eventRepository.query(
        `insert into Events_Users (UserID, EventID) values (${Number(userId)}, ${Number(result.EventID)})`,
      );
    });
    Promise.resolve(response);

    await this.eventRepository.query(
      `insert into Positions (lat, lng, eventId) values (${Number(position.lat)}, ${Number(position.lng)}, ${Number(result.EventID)})`,
    );

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

  async users(event: any): Promise<User[]> {
    const result = await this.eventRepository.query(
      `select * from Events_Users where EventID = ${event.EventID}`,
    );
    return result;
  }

  async position(event: any): Promise<Position> {
    const result = await this.eventRepository.query(
      `select * from Positions where eventId = ${event.EventID}`,
    );
    return result[0];
  }
}
