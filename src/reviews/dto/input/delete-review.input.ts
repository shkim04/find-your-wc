import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteReviewInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
