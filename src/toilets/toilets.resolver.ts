import { Args, Resolver, Query, Mutation } from '@nestjs/graphql';
import { Toilet } from './models/toilets';
import { ToiletsService } from './toilets.service';
import { GetToiletArgs } from './dto/args/get-toilet.args';
import { GetToiletsArgs } from './dto/args/get-toilets.args';
import { CreateToiletInput } from './dto/input/create-toilet.input';
import { UpdateToiletInput } from './dto/input/update-user.input';
import { DeleteToiletInput } from './dto/input/delete-toilet.input';

@Resolver(() => Toilet)
export class ToiletResolver {
  constructor(private readonly toiletService: ToiletsService) {}

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
    @Args('deleteToiletDate') deleteToiletData: DeleteToiletInput,
  ): Promise<Toilet> {
    return this.toiletService.deleteToilets(deleteToiletData);
  }
}
