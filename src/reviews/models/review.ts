import { Field, ObjectType } from '@nestjs/graphql';
import { Toilet } from 'src/toilets/models/toilet';

@ObjectType()
export class Review {
  @Field()
  id: string;

  @Field()
  cleanliness: number;

  @Field()
  performance: number;

  @Field()
  remark?: string;

  @Field()
  contributedBy: string;

  @Field()
  toiletId: string;

  @Field(() => Toilet, { nullable: false })
  toilet: Toilet;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
