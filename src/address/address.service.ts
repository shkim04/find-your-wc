import { Injectable } from '@nestjs/common';
import * as uuidv4 from 'uuid';
import { CreateAddressInput } from './dto/input/create-address.input';
import { UpdateAddressInput } from './dto/input/update-address.input';
import { DeleteAddressInput } from './dto/input/delete-address.input';

import { Address } from './models/address';

@Injectable()
export class AddressService {
  private addresses: Address[] = [];

  public async getAddress(getAddressArgs): Promise<Address> {
    return this.addresses.find((address) => address.id === getAddressArgs.id);
  }

  public async createAddress(
    createAddressData: CreateAddressInput,
  ): Promise<Address> {
    const address: Address = {
      id: uuidv4(),
      ...createAddressData,
    };

    this.addresses.push(address);
    return address;
  }

  public async updateAddress(
    updateAddressData: UpdateAddressInput,
  ): Promise<Address> {
    const address = this.addresses.find(
      (address) => address.id === updateAddressData.id,
    );

    Object.assign(address, updateAddressData);
    return address;
  }

  public async deleteAddress(
    deleteAddressData: DeleteAddressInput,
  ): Promise<Address> {
    const addressIndex = this.addresses.findIndex(
      (address) => address.id === deleteAddressData.id,
    );
    const review = this.addresses[addressIndex];

    this.addresses = this.addresses.filter(
      (review, index) => index !== addressIndex,
    );

    return review;
  }
}
