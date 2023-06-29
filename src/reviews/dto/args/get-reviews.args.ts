import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetReviewsArgs {
  @Field()
  @IsArray()
  ids: string[];
}
