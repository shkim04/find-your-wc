import { Field, ObjectType } from '@nestjs/graphql';
import { Address } from 'src/address/models/address';
import { Review } from 'src/reviews/models/reviews';

@ObjectType()
export class Toilet {
  @Field()
  id: string;

  @Field(() => Address, { nullable: false })
  address: Address;

  @Field(() => [Review])
  reviews?: Review[];

  @Field()
  isPaid: boolean;

  @Field()
  price: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
