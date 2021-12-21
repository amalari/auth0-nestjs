import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './users/users.module';
import { AuthzModule } from './auth/authz.module';

@Module({
  imports: [
    UsersModule,
    AuthzModule,
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      introspection: true,
      playground: true,
    }),
  ],
})
export class AppModule {}
