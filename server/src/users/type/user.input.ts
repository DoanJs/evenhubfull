import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field({ nullable: true })
  Username?: string;

  @Field({ nullable: true })
  Email?: string;

  @Field({ nullable: true })
  Password?: string;

  @Field({ nullable: true })
  PhotoUrl?: string;

  @Field({ nullable: true })
  isChangePassword?: number;

  @Field((types) => [Event], { nullable: true })
  user_followers?: [Event];
}
