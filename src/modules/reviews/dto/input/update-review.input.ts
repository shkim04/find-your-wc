import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateReviewInput {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;

  @Field(() => Float)
  cleanliness: number;

  @Field(() => Float)
  performance: number;

  @Field()
  description: string;

  @Field(() => String)
  @IsNotEmpty()
  contributedBy: string;

  @Field(() => String)
  @Exclude()
  password: string;
}
