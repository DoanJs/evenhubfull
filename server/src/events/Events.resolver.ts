import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { GraphQLGuard } from 'src/auth/GraphQL.Guard';
import { Event, EventsService } from './';
import { EventInput } from './type/event.input';
import { User } from 'src/users';
import { Position } from 'src/positions/Position.model';

@Resolver(() => Event)
@UseGuards(GraphQLGuard)
export class EventsResolver {
  constructor(private eventsService: EventsService) {}

  @Query(() => [Event])
  events(): Promise<Event[]> {
    return this.eventsService.events();
  }

  @Mutation((returns) => Event)
  createEvent(
    @Args('eventinput', { type: () => EventInput }) eventinput: EventInput,
  ): Promise<Event> {
    return this.eventsService.createEvent(eventinput);
  }

  // relation
  @ResolveField((returns) => User)
  author(@Parent() event: Event): Promise<User> {
    return this.eventsService.author(event);
  }

  @ResolveField((returns) => [User])
  users(@Parent() event: Event): Promise<User[]> {
    return this.eventsService.users(event);
  }

  @ResolveField((returns) => Position)
  position(@Parent() event: Event): Promise<Position> {
    return this.eventsService.position(event);
  }
}
