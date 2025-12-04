import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteToiletInput {
  @Field(() => Int)
  @IsNotEmpty()
  id: number;
}
