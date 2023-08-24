import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class GetToiletsArgs {
  @Field(() => String)
  @IsString()
  street?: string;

  @Field(() => String)
  @IsString()
  city?: string;

  @Field(() => String)
  @IsString()
  country?: string;
}
