import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Address } from 'src/address/models/address';
import { Review } from 'src/reviews/models/reviews';

@InputType()
export class CreateToiletInput {
  @Field()
  @IsNotEmpty()
  addressId: string;

  @Field()
  address: Address;

  @Field()
  @IsNotEmpty()
  isPaid: boolean;

  @Field()
  @IsNotEmpty()
  price: number;

  @Field()
  reviews?: Review[];
}
