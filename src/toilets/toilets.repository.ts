import { Injectable } from '@nestjs/common';
import { Prisma, Toilet } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { TotalAggregate } from './models/total-aggregate';

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
    where?: Prisma.ToiletWhereInput;
  }): Promise<Toilet> {
    const { where } = params;
    return this.prisma.toilet.findFirst({ where });
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

  async totalAggregate(): Promise<TotalAggregate> {
    const [
      toiletCount,
      reviewCount,
      countryGroupBy,
      cityGroupBy,
      streetGroupBy,
    ] = await Promise.all([
      this.prisma.toilet.count({ select: { _all: true } }),
      this.prisma.review.count({ select: { _all: true } }),
      this.prisma.address.groupBy({
        by: ['country'],
        _count: { _all: true },
      }),
      this.prisma.address.groupBy({
        by: ['city'],
        _count: { _all: true },
      }),
      this.prisma.address.groupBy({
        by: ['street'],
        _count: { _all: true },
      }),
    ]);

    return {
      numOfToilets: toiletCount._all,
      numOfReviews: reviewCount._all,
      numOfCountries: countryGroupBy.length,
      numOfCities: cityGroupBy.length,
      numOfStreets: streetGroupBy.length,
    };
  }
}
