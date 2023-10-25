import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TotalAggregate {
  @Field(() => Int)
  numOfReviews: number;

  @Field(() => Int)
  numOfToilets: number;

  @Field(() => Int)
  numOfCountries: number;

  @Field(() => Int)
  numOfCities: number;

  @Field(() => Int)
  numOfStreets: number;
}
