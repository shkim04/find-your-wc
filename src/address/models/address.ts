import { Field, ObjectType } from '@nestjs/graphql';
import { Toilet } from 'src/toilets/models/toilets';

@ObjectType()
export class Address {
  @Field()
  id: string;

  @Field()
  streetNumber: string;

  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  country: string;

  @Field()
  toilet: Toilet;
}
