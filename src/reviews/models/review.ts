import { Field, Float, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Review as ReviewDB } from '@prisma/client';

@ObjectType()
export class Review {
  @Field(() => String)
  id: ReviewDB['id'];

  @Field(() => Float)
  cleanliness: ReviewDB['cleanliness'];

  @Field(() => Float)
  performance: ReviewDB['performance'];

  @Field(() => String, { nullable: true })
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
