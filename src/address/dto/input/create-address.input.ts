import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAddressInput {
  @Field()
  @IsNotEmpty()
  streetNumber: string;

  @Field()
  @IsNotEmpty()
  street: string;

  @Field()
  @IsNotEmpty()
  city: string;

  @Field()
  @IsNotEmpty()
  country: string;

  @Field()
  @IsNotEmpty()
  toiletId: string;
}
