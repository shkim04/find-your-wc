import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetReviewsArgs {
  @Field(() => String)
  @IsArray()
  toiletId: string;
}
