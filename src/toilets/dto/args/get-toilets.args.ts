import { ArgsType, Field } from '@nestjs/graphql';
import { IsArray } from 'class-validator';

@ArgsType()
export class GetToiletsArgs {
  @Field(() => [String])
  @IsArray()
  ids?: string[];

  @Field(() => [String])
  @IsArray()
  streets?: string[];

  @Field(() => [String])
  @IsArray()
  cities?: string[];

  @Field(() => [String])
  @IsArray()
  countries?: string[];
}
