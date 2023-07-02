import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetAddressArgs {
  @Field(() => String)
  @IsNotEmpty()
  toiletId: string;
}
