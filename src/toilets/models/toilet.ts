import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Toilet as ToiletDB } from '@prisma/client';
import { Address } from '../../address/models/address';
import { Review } from '../../reviews/models/review';

@ObjectType()
export class Toilet {
  @Field(() => Int)
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
