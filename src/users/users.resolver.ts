import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { PubSub } from 'graphql-subscriptions';
import { UsersArgs, User, UpdateProfileInput } from './dto';
import { GetUsersQuery } from './queries/impl';
import { UpdateUserCommand } from './commands/impl';

const pubSub = new PubSub();

@Resolver((of) => User)
export class UsersResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Query((returns) => [User])
  @UseGuards(GqlAuthGuard)
  users(@Args() usersArgs: UsersArgs): Promise<User[]> {
    return this.queryBus.execute(new GetUsersQuery());
  }

  @Mutation((returns) => User)
  @UseGuards(GqlAuthGuard)
  updateProfile(
    @CurrentUser() user: any,
    @Args('input') userData: UpdateProfileInput,
  ): Promise<User> {
    return this.commandBus.execute(
      new UpdateUserCommand(user.sub, userData.name),
    );
  }
}
