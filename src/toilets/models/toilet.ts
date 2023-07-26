import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Toilet as ToiletDB } from '@prisma/client';
import { Address } from 'src/address/models/address';
import { Review } from 'src/reviews/models/review';

@ObjectType()
export class Toilet {
  @Field(() => String)
  id: ToiletDB['id'];

  @Field(() => Boolean)
  isPaid: ToiletDB['isPaid'];

  @Field(() => Int)
  price: ToiletDB['price'];

  @Field(() => Address)
  address?: Address;

  @Field(() => Review)
  reviews?: Review[];
}
