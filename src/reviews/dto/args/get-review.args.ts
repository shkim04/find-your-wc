import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetReviewArgs {
  @Field()
  @IsNotEmpty()
  id: string;
}
