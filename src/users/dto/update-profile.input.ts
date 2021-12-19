import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field()
  @IsNotEmpty()
  name: string;
}
