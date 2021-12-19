import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UsersArgs, User, UpdateProfileInput, Stats, StatsArgs } from './dto';
import { GetUsersQuery, GetStatsQuery } from './queries/impl';
import {
  UpdateUserCommand,
  ResendEmailVerificationCommand,
} from './commands/impl';

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

  @Query((returns) => [Stats])
  @UseGuards(GqlAuthGuard)
  dailyStats(
    @Args('from') from: string,
    @Args('to') to: string,
  ): Promise<Stats[]> {
    return this.queryBus.execute(new GetStatsQuery(from, to));
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

  @Mutation((returns) => Boolean)
  @UseGuards(GqlAuthGuard)
  resendEmailVerification(@CurrentUser() user: any): Promise<boolean> {
    return this.commandBus.execute(
      new ResendEmailVerificationCommand(user.sub),
    );
  }
}
