import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Toilet } from './models/toilet';

import { GetToiletArgs } from './dto/args/get-toilet.args';
import { GetToiletsArgs } from './dto/args/get-toilets.args';

import { CreateToiletInput } from './dto/input/create-toilet.input';
import { UpdateToiletInput } from './dto/input/update-toilet.input';
import { DeleteToiletInput } from './dto/input/delete-toilet.input';

import { ToiletsService } from './toilets.service';
import { AddressService } from 'src/address/address.service';
import { ReviewsService } from 'src/reviews/reviews.service';

import { Address } from 'src/address/models/address';
import { Review } from 'src/reviews/models/review';

@Resolver(() => Toilet)
export class ToiletsResolver {
  constructor(
    private readonly toiletService: ToiletsService,
    private readonly addressService: AddressService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Query(() => Toilet, { name: 'toilet', nullable: false })
  async getToilet(@Args() getToiletArgs: GetToiletArgs): Promise<Toilet> {
    return this.toiletService.getToilet(getToiletArgs);
  }

  @Query(() => [Toilet], { name: 'toilets', nullable: false })
  async getToilets(@Args() getToiletsArgs: GetToiletsArgs): Promise<Toilet[]> {
    return this.toiletService.getToilets(getToiletsArgs);
  }

  @Mutation(() => Toilet)
  async createToilet(
    @Args('createToiletData') createToiletData: CreateToiletInput,
  ): Promise<Toilet> {
    return this.toiletService.createToilet(createToiletData);
  }

  @Mutation(() => Toilet)
  async updateToilet(
    @Args('updateToiletData') updateToiletData: UpdateToiletInput,
  ): Promise<Toilet> {
    return this.toiletService.updateToilet(updateToiletData);
  }

  @Mutation(() => Toilet)
  async deleteToilet(
    @Args('deleteToiletData') deleteToiletData: DeleteToiletInput,
  ): Promise<Toilet> {
    return this.toiletService.deleteToilet(deleteToiletData);
  }

  @ResolveField('address', () => Address)
  async getAddressByToiletId(@Parent() toilet: Toilet): Promise<Address> {
    return this.addressService.getAddress({ toiletId: toilet.id });
  }

  @ResolveField('reviews', () => [Review])
  async getAllReviewsByToiletId(@Parent() toilet: Toilet): Promise<Review[]> {
    return this.reviewsService.getReviews({ toiletId: toilet.id });
  }
}
