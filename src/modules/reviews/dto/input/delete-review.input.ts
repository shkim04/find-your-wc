import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteReviewInput {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;

  @Field(() => String)
  @IsNotEmpty()
  contributedBy: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;
}
