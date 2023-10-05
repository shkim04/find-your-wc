import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @Field()
  cleanliness: number;

  @Field()
  performance: number;

  @Field()
  description: string;

  @Field(() => Int, { nullable: true })
  toiletId?: number;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  contributedBy: string;

  @Field()
  @IsNotEmpty()
  password: string;
}
