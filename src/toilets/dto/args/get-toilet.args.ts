import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@ArgsType()
export class GetToiletArgs {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  streetNumber: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  street: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  city: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  country: string;
}
