import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateAddressInput {
  @Field()
  @IsNotEmpty()
  id: string;

  @Field()
  streetNumber: string;

  @Field()
  street: string;

  @Field()
  city: string;

  @Field()
  country: string;
}
