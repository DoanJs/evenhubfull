import { Resolver, Query } from '@nestjs/graphql';
import { User, UsersService } from '.';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => [User])
  users(): Promise<User[]> {
    return this.usersService.users();
  }
}
