import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Toilet as ToiletDB } from '@prisma/client';

@ObjectType()
export class Toilet {
  @Field(() => String)
  id: ToiletDB['id'];

  @Field(() => Boolean)
  isPaid: ToiletDB['isPaid'];

  @Field(() => Int)
  price: ToiletDB['price'];
}
