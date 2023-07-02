import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteToiletInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
