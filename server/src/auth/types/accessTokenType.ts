import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AccessTokenType {
  @Field()
  access_token: string;
  user: {
    Username: string;
    Email: string;
  };
}
