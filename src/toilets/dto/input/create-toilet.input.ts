import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateAddressInput } from 'src/address/dto/input/create-address.input';
import { CreateReviewInput } from 'src/reviews/dto/input/create-review.input';

@InputType()
export class CreateToiletInput {
  @Field()
  @IsNotEmpty()
  isPaid: boolean;

  @Field()
  @IsNotEmpty()
  price: number;

  @Field()
  address?: CreateAddressInput;

  @Field()
  reviews?: CreateReviewInput;
}
