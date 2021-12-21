import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'stats ' })
export class Stats {
  @Field((type) => ID)
  id: string;

  @Field()
  date: string;

  @Field((type) => Int)
  logins: string;

  @Field(() => [String])
  user_ids: string[];
}
