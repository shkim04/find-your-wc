import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Toilet } from './models/toilet';
import { TotalAggregate } from './models/total-aggregate';
import { GetToiletArgs } from './dto/args/get-toilet.args';
import { GetToiletsArgs } from './dto/args/get-toilets.args';
import { CreateToiletInput } from './dto/input/create-toilet.input';
import { UpdateToiletInput } from './dto/input/update-toilet.input';
import { DeleteToiletInput } from './dto/input/delete-toilet.input';
import { ToiletsService } from './toilets.service';
import { Address } from '../address/models/address';
import { Review } from '../reviews/models/review';

@Resolver(() => Toilet)
export class ToiletsResolver {
  constructor(private readonly toiletsService: ToiletsService) {}

  @Query(() => Toilet)
  getToilet(@Args() args: GetToiletArgs): Promise<Toilet> {
    return this.toiletsService.getToilet(args);
  }

  @Query(() => [Toilet])
  getToilets(@Args() args: GetToiletsArgs): Promise<Toilet[]> {
    return this.toiletsService.getToilets(args);
  }

  @Query(() => TotalAggregate)
  getAggregate(): Promise<TotalAggregate> {
    return this.toiletsService.totalAggregate();
  }

  @Mutation(() => Toilet)
  createToilet(@Args('input') input: CreateToiletInput): Promise<Toilet> {
    return this.toiletsService.createToilet(input);
  }

  @Mutation(() => Toilet)
  updateToilet(@Args('input') input: UpdateToiletInput): Promise<Toilet> {
    return this.toiletsService.updateToilet(input);
  }

  @Mutation(() => Toilet)
  deleteToilet(@Args('input') input: DeleteToiletInput): Promise<Toilet> {
    return this.toiletsService.deleteToilet(input);
  }

  @ResolveField(() => Address)
  address(@Parent() toilet: Toilet): Promise<Address> {
    return this.toiletsService.getAddressForToilet(toilet.id);
  }

  @ResolveField(() => [Review])
  reviews(@Parent() toilet: Toilet): Promise<Review[]> {
    return this.toiletsService.getReviewsForToilet(toilet.id);
  }
}
