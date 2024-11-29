import { Resolver, Query } from '@nestjs/graphql';
import { Event, EventsService } from './';
import { UseGuards } from '@nestjs/common';
import { GraphQLGuard } from 'src/auth/GraphQL.Guard';

@Resolver(() => Event)
@UseGuards(GraphQLGuard)
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => [Event])
  events(): Promise<Event[]> {
    return this.eventsService.events();
  }
}
