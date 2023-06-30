import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { Review as ReviewDB } from '@prisma/client';

@ObjectType()
export class Review {
  @Field(() => String)
  id: ReviewDB['id'];

  @Field(() => Int)
  cleanliness: ReviewDB['cleanliness'];

  @Field(() => Int)
  performance: ReviewDB['performance'];

  @Field(() => String)
  description?: ReviewDB['description'];

  @Field(() => String)
  contributedBy: ReviewDB['contributedBy'];

  @Field(() => String)
  toiletId: ReviewDB['id'];

  @Field(() => GraphQLISODateTime)
  createdAt: ReviewDB['createdAt'];

  @Field(() => GraphQLISODateTime)
  updatedAt: ReviewDB['updatedAt'];
}
