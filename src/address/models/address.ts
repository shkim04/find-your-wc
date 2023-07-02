import { Field, ObjectType } from '@nestjs/graphql';
import { Address as AddressDB } from '@prisma/client';

@ObjectType()
export class Address {
  @Field(() => String)
  id: AddressDB['id'];

  @Field(() => String)
  streetNumber: AddressDB['streetNumber'];

  @Field(() => String)
  street: AddressDB['street'];

  @Field(() => String)
  city: AddressDB['city'];

  @Field(() => String)
  country: AddressDB['country'];

  @Field(() => String)
  toiletId: AddressDB['id'];
}
