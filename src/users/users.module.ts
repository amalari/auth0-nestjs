import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [CqrsModule],
  providers: [UsersResolver],
})
export class UsersModule {}
