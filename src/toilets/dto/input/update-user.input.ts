import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Address } from 'src/address/models/address';
import { Review } from 'src/reviews/models/reviews';

@InputType()
export class UpdateToiletInput {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  @IsNotEmpty()
  addressId: string;

  @Field()
  @IsNotEmpty()
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
