import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PubSub } from 'graphql-subscriptions';
import { UsersArgs, User } from './dto';
import { GetUsersQuery } from './queries/impl';

const pubSub = new PubSub();

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query((returns) => [User])
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    console.log('--------------------------');
    return this.queryBus.execute(new GetUsersQuery());
  }
}
