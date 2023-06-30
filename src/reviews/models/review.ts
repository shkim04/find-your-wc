import { Field, ObjectType } from '@nestjs/graphql';
import { Review as ReviewDB, Toilet as ToiletDB } from '@prisma/client';

@ObjectType()
export class Review {
  @Field()
  id: ReviewDB['id'];

  @Field()
  cleanliness: ReviewDB['cleanliness'];

  @Field()
  performance: ReviewDB['performance'];

  @Field()
  description?: ReviewDB['description'];

  @Field()
  contributedBy: ReviewDB['contributedBy'];

  @Field()
  toiletId: ToiletDB['id'];

  @Field()
  toilet: ToiletDB;

  @Field()
  createdAt: ReviewDB['createdAt'];

  @Field()
  updatedAt: ReviewDB['updatedAt'];
}
