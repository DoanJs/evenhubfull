import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User, UsersService } from '.';
import { EventFollowerInput } from './type/event_follower.input';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.users();
  }

  @Query(() => User)
  user(@Args('email') email: string): Promise<User> {
    return this.usersService.user(email);
  }

  @Mutation((returns) => String)
  editEventFollower(
    // @Args('userId') userId: number,
    // @Args('eventId') eventId: number,
    @Args('eventFollowerInput')
    eventFollowerInput: EventFollowerInput,
  ): Promise<String> {
    return this.usersService.editEventFollower(eventFollowerInput);
  }

  // relation

  @ResolveField((returns) => [Event])
  user_followers(@Parent() user: User): Promise<Event[]> {
    return this.usersService.user_followers(user.UserID);
  }
}
