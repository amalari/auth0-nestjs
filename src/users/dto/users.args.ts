import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class UsersArgs {
  @Field((type) => Int)
  @Min(0)
  page = 0;

  @Field((type) => Int)
  @Min(1)
  per_page = 25;

  @Field({ nullable: true })
  sort?: string;

  @Field({ nullable: true })
  q?: string;
}
