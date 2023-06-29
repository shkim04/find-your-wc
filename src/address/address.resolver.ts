import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { Address } from './models/address';
import { GetAddressArgs } from './dto/args/get-address.args';
import { CreateAddressInput } from './dto/input/create-address.input';
import { UpdateAddressInput } from './dto/input/update-address.input';
import { DeleteAddressInput } from './dto/input/delete-address.input';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => Address, { name: 'address', nullable: false })
  async getAddress(@Args() getAddressArgs: GetAddressArgs): Promise<Address> {
    return this.addressService.getAddress(getAddressArgs);
  }

  @Mutation(() => Address)
  async createAddress(
    @Args('createAddressData') createAddressData: CreateAddressInput,
  ): Promise<Address> {
    return this.addressService.createAddress(createAddressData);
  }

  @Mutation(() => Address)
  async updateAddress(
    @Args('updateAddressData') updateAddressData: UpdateAddressInput,
  ): Promise<Address> {
    return this.addressService.updateAddress(updateAddressData);
  }

  @Mutation(() => Address)
  async deleteAddress(
    @Args('deleteAddressData') deleteAddressData: DeleteAddressInput,
  ): Promise<Address> {
    return this.addressService.deleteAddress(deleteAddressData);
  }
}
