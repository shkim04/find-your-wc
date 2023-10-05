import { Field, InputType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateReviewInput {
  @Field()
  @IsNotEmpty()
  id: number;

  @Field()
  cleanliness: number;

  @Field()
  performance: number;

  @Field()
  description: string;

  @Field()
  @IsNotEmpty()
  contributedBy: string;

  @Field()
  @Exclude()
  password: string;
}
