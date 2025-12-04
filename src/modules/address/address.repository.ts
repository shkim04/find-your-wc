import { Injectable } from '@nestjs/common';
import { Prisma, Address } from '@prisma/client';
import { PrismaService } from '../../infra/database/prisma.service';

@Injectable()
export class AddressRepository {
  constructor(private prisma: PrismaService) {}

  async getAddress(params: {
    where?: Prisma.AddressWhereUniqueInput;
  }): Promise<Address> {
    const { where } = params;
    return this.prisma.address.findUnique({ where });
  }

  async getAddresses(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AddressWhereUniqueInput;
    where?: Prisma.AddressWhereInput;
    orderBy?: Prisma.AddressOrderByWithRelationInput;
  }): Promise<Address[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.address.findMany({ skip, take, cursor, where, orderBy });
  }

  async createAddress(params: {
    data: Prisma.AddressCreateInput;
  }): Promise<Address> {
    const { data } = params;
    return this.prisma.address.create({ data });
  }

  async updateAddress(params: {
    where: Prisma.AddressWhereUniqueInput;
    data: Prisma.AddressUpdateInput;
  }): Promise<Address> {
    const { where, data } = params;
    return this.prisma.address.update({ where, data });
  }

  async deleteAddress(params: {
    where: Prisma.AddressWhereUniqueInput;
  }): Promise<Address> {
    const { where } = params;
    return this.prisma.address.delete({ where });
  }
}
