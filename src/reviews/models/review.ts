import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';
import { Review as ReviewDB } from '@prisma/client';

@ObjectType()
export class Review {
  @Field(() => Int)
  id: ReviewDB['id'];

  @Field(() => Float)
  cleanliness: ReviewDB['cleanliness'];

  @Field(() => Float)
  performance: ReviewDB['performance'];

  @Field(() => String, { nullable: true })
  description?: ReviewDB['description'];

  @Field(() => String)
  contributedBy: ReviewDB['contributedBy'];

  password: ReviewDB['password'];

  @Field(() => String)
  toiletId: ReviewDB['toiletId'];

  @Field(() => GraphQLISODateTime)
  createdAt: ReviewDB['createdAt'];

  @Field(() => GraphQLISODateTime)
  updatedAt: ReviewDB['updatedAt'];
}
