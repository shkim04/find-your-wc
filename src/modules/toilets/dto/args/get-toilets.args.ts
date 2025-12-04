import { ArgsType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@ArgsType()
export class GetToiletsArgs {
  @Field(() => String, { nullable: true })
  @IsString()
  street?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  city?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  country?: string;
}
