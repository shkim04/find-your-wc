import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field(() => Float)
  cleanliness: number;

  @Field(() => Float)
  performance: number;

  @Field(() => String)
  description: string;

  @Field(() => Int, { nullable: true })
  toiletId?: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsEmail()
  contributedBy: string;

  @Field(() => String)
  @IsNotEmpty()
  password: string;
}
