import { Injectable } from '@nestjs/common';
import * as uuidv4 from 'uuid';

import { GetAddressArgs } from './dto/args/get-address.args';
import { CreateAddressInput } from './dto/input/create-address.input';
import { UpdateAddressInput } from './dto/input/update-address.input';
import { DeleteAddressInput } from './dto/input/delete-address.input';

import { Address } from './models/address';
import { AddressRepository } from './address.repository';

@Injectable()
export class AddressService {
  constructor(private addressRepository: AddressRepository) {}

  public async getAddress(getAddressArgs: GetAddressArgs): Promise<Address> {
    return await this.addressRepository.getAddress({
      where: { id: getAddressArgs.id },
    });
  }

  public async getAddresses({ city, street }): Promise<Address[]> {
    return await this.addressRepository.getAddresses({
      where: { OR: [{ city: city }, { street: street }] },
    });
  }

  public async createAddress(
    createAddressData: CreateAddressInput,
  ): Promise<Address> {
    const address = await this.addressRepository.createAddress({
      data: {
        id: uuidv4(),
        ...createAddressData,
      },
    });

    return address;
  }

  public async updateAddress(
    updateAddressData: UpdateAddressInput,
  ): Promise<Address> {
    const address = await this.addressRepository.updateAddress({
      where: { id: updateAddressData.id },
      data: updateAddressData,
    });

    return address;
  }

  public async deleteAddress(
    deleteAddressData: DeleteAddressInput,
  ): Promise<Address> {
    const address = await this.addressRepository.deleteAddress({
      where: { id: deleteAddressData.id },
    });

    return address;
  }
}
