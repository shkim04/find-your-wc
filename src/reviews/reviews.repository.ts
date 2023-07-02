import { Injectable } from '@nestjs/common';
import { Prisma, Review } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ReviewRepository {
  constructor(private prisma: PrismaService) {}

  async getReview(params: {
    where?: Prisma.ReviewWhereUniqueInput;
  }): Promise<Review> {
    const { where } = params;
    return this.prisma.review.findUnique({ where });
  }

  async getReviews(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ReviewWhereUniqueInput;
    where?: Prisma.ReviewWhereInput;
    orderBy?: Prisma.ReviewOrderByWithRelationInput;
  }): Promise<Review[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.review.findMany({ skip, take, cursor, where, orderBy });
  }

  async createReview(params: {
    data: Prisma.ReviewCreateInput;
  }): Promise<Review> {
    const { data } = params;
    return this.prisma.review.create({ data });
  }

  async updateReview(params: {
    where: Prisma.ReviewWhereUniqueInput;
    data: Prisma.ReviewUpdateInput;
  }): Promise<Review> {
    const { where, data } = params;
    return this.prisma.review.update({ where, data });
  }

  async deleteReview(params: {
    where: Prisma.ReviewWhereUniqueInput;
  }): Promise<Review> {
    const { where } = params;
    return this.prisma.review.delete({ where });
  }
}
