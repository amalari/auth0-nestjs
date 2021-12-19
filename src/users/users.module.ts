import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersResolver } from './users.resolver';
import { QueryHandlers } from './queries/handlers';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [CqrsModule, HttpModule],
  providers: [UsersResolver, ...QueryHandlers, ...CommandHandlers],
})
export class UsersModule {}
