import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Toilet {
  @Field()
  id: string;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  address: string;
  // cleanliness: number;
  // contributor: Contributor[];
  // createdAt: Date;
  // updatedAt: Date;
}

// class City {
//   id: string;
//   toilets: Toilet[];
//   country: string;
// }

// class Contributor {
//   id: string;
//   email: string;
//   cleanliness: number;
//   experience: string;
// }
