import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Toilet as ToiletDB,
  Address as AddressDB,
  Review as ReviewDB,
} from '@prisma/client';

@ObjectType()
export class Toilet {
  @Field(() => String)
  id: ToiletDB['id'];

  @Field()
  address?: AddressDB;

  @Field()
  reviews?: ReviewDB[];

  @Field(() => Boolean)
  isPaid: ToiletDB['isPaid'];

  @Field(() => Int)
  price: ToiletDB['price'];
}
