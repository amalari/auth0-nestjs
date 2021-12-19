import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'stats ' })
export class StatsArgs {
  @Field()
  from: string;

  @Field()
  to: string;
}
