import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { UsersArgs, User } from './dto';

const pubSub = new PubSub();

@Resolver((of) => User)
export class UsersResolver {
  @Query((returns) => [User])
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    const exUsers = async () => [] as User[];
    return exUsers();
  }
}
