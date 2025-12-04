import { ArgsType, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@ArgsType()
export class GetReviewsArgs {
  @Field(() => Number)
  @IsNumber()
  toiletId: number;
}
