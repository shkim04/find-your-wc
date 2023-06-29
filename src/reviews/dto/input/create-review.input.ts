import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field()
  cleanliness: number;

  @Field()
  performance: number;

  @Field()
  remark?: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  contributedBy: string;
}
