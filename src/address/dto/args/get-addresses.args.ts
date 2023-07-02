import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class GetAddressesArgs {
  @Field()
  street?: string;

  @Field()
  city?: string;

  @Field()
  country?: string;
}
