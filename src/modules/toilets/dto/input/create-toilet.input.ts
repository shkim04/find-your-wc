import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsNotEmptyObject, IsNumber, IsOptional } from 'class-validator';
import { CreateAddressInput } from '../../../address/dto/input/create-address.input';
import { CreateReviewInput } from '../../../reviews/dto/input/create-review.input';

@InputType()
export class CreateToiletInput {
  @Field()
  @IsNotEmpty()
  @IsBoolean()
  isPaid: boolean;

  @Field()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Field(() => CreateAddressInput)
  @IsNotEmptyObject()
  address: CreateAddressInput;

  @Field(() => [CreateReviewInput], { nullable: true })
  @IsOptional()
  reviews?: CreateReviewInput[];
}
