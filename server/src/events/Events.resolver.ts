import { Resolver, Query } from '@nestjs/graphql';
import { Event, EventsService } from './';

@Resolver(() => Event)
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => [Event])
  events(): Promise<Event[]> {
    return this.eventsService.events();
  }
}
