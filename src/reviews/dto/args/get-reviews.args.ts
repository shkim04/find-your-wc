import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class GetReviewsArgs {
  @Field(() => String)
  @IsString()
  toiletId: string;
}
