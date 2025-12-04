import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class DeleteAddressInput {
  @Field()
  @IsNotEmpty()
  id: string;
}
