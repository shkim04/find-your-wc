import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Address } from 'src/address/models/address';
import { Review } from 'src/reviews/models/review';

@ObjectType()
export class Toilet {
  @Field()
  id: string;

  @Field(() => Address, { nullable: false })
  address?: Address;

  @Field(() => [Review], { nullable: 'itemsAndList' })
  reviews?: Review[];

  @Field()
  isPaid: boolean;

  @Field(() => Int)
  price: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
