import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'user ' })
export class User {
  @Field((type) => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  picture: string;

  @Field()
  email_verified: boolean;

  @Field()
  created_at: string;

  @Field()
  last_login: string;

  @Field(() => Int)
  logins_count: string;
}
