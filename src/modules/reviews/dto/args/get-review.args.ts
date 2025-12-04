import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetReviewArgs {
  @Field(() => Int)
  @IsNotEmpty()
  toiletId: number;

  @Field()
  @IsNotEmpty()
  contributedBy: string;
}
