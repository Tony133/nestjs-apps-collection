import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class UsersArgs {
  @Field(() => Int)
  @Min(0)
  offset = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  limit = 25;
}
