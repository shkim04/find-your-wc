import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateToiletInput {
  @Field()
  @IsNotEmpty()
  isPaid: boolean;

  @Field()
  @IsNotEmpty()
  price: number;
}
