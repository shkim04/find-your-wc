import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateReviewInput {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  cleanliness: number;

  @Field()
  performance: number;

  @Field()
  description?: string;
}
