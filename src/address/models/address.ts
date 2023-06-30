import { Field, ObjectType } from '@nestjs/graphql';
import { Address as AddressDB, Toilet as ToiletDB } from '@prisma/client';

@ObjectType()
export class Address {
  @Field()
  id: AddressDB['id'];

  @Field()
  streetNumber: AddressDB['streetNumber'];

  @Field()
  street: AddressDB['street'];

  @Field()
  city: AddressDB['city'];

  @Field()
  country: AddressDB['country'];

  @Field()
  toiletId?: ToiletDB['id'];

  @Field()
  toilet?: ToiletDB;
}
