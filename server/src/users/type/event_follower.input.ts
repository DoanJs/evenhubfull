import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EventFollowerInput {
  @Field({ nullable: true })
  type?: 'insert' | 'delete';

  @Field({ nullable: true })
  UserID?: number;

  @Field({ nullable: true })
  EventID?: number;
}
