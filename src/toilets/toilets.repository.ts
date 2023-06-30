import { Injectable } from '@nestjs/common';
import { Prisma, Toilet } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ToiletsRepository {
  constructor(private prisma: PrismaService) {}

  async createToilet(params: {
    data: Prisma.ToiletCreateInput;
  }): Promise<Toilet> {
    const { data } = params;
    return this.prisma.toilet.create({ data });
  }

  async getToilet(params: {
    where?: Prisma.ToiletWhereUniqueInput;
  }): Promise<Toilet> {
    const { where } = params;
    return this.prisma.toilet.findUnique({ where });
  }

  async getToilets(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ToiletWhereUniqueInput;
    where?: Prisma.ToiletWhereInput;
    orderBy?: Prisma.ToiletOrderByWithRelationInput;
  }): Promise<Toilet[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.toilet.findMany({ skip, take, cursor, where, orderBy });
  }

  async updateToilet(params: {
    where: Prisma.ToiletWhereUniqueInput;
    data: Prisma.ToiletUpdateInput;
  }): Promise<Toilet> {
    const { where, data } = params;
    return this.prisma.toilet.update({ where, data });
  }

  async deleteToilet(params: {
    where: Prisma.ToiletWhereUniqueInput;
  }): Promise<Toilet> {
    const { where } = params;
    return this.prisma.toilet.delete({ where });
  }
}
