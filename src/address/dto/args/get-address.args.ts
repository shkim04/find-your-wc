import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetAddressArgs {
  @Field(() => Int)
  @IsNotEmpty()
  toiletId: number;
}
