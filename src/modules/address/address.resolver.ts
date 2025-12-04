import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { AddressService } from './address.service';
import { Address } from './models/address';
import { GetAddressArgs } from './dto/args/get-address.args';
import { CreateAddressInput } from './dto/input/create-address.input';
import { UpdateAddressInput } from './dto/input/update-address.input';
import { DeleteAddressInput } from './dto/input/delete-address.input';
import { GetAddressesArgs } from './dto/args/get-addresses.args';

@Resolver(() => Address)
export class AddressResolver {
  constructor(private readonly addressService: AddressService) {}

  @Query(() => Address, { name: 'address', nullable: false })
  async getAddress(@Args() args: GetAddressArgs): Promise<Address> {
    return this.addressService.getAddress(args);
  }

  @Query(() => Address, { name: 'addresses', nullable: false })
  async getAddresses(@Args() args: GetAddressesArgs): Promise<Address[]> {
    return this.addressService.getAddresses(args);
  }

  @Mutation(() => Address)
  async createAddress(@Args('input') input: CreateAddressInput): Promise<Address> {
    return this.addressService.createAddress(input);
  }

  @Mutation(() => Address)
  async updateAddress(@Args('input') input: UpdateAddressInput): Promise<Address> {
    return this.addressService.updateAddress(input);
  }

  @Mutation(() => Address)
  async deleteAddress(@Args('input') input: DeleteAddressInput): Promise<Address> {
    return this.addressService.deleteAddress(input);
  }
}
