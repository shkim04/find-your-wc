import { ArgsType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class GetToiletArgs {
  @Field()
  @IsNotEmpty()
  id: string;
}
