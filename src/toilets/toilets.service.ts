import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

import { Toilet } from './models/toilet';
import { TotalAggregate } from './models/total-aggregate';

import { CreateToiletInput } from './dto/input/create-toilet.input';
import { UpdateToiletInput } from './dto/input/update-toilet.input';
import { DeleteToiletInput } from './dto/input/delete-toilet.input';

import { GetToiletArgs } from './dto/args/get-toilet.args';
import { GetToiletsArgs } from './dto/args/get-toilets.args';

import { ToiletsRepository } from './toilets.repository';

@Injectable()
export class ToiletsService {
  constructor(
    private repository: ToiletsRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getToilet(getToiletArgs: GetToiletArgs): Promise<Toilet> {
    const toilet = await this.repository.getToilet({
      where: {
        AND: [
          {
            address: {
              streetNumber: getToiletArgs.streetNumber,
            },
          },
          {
            address: {
              street: getToiletArgs.street,
            },
          },
          {
            address: {
              city: getToiletArgs.city,
            },
          },
          {
            address: {
              country: getToiletArgs.country,
            },
          },
        ],
      },
    });

    if (!toilet) throw new NotFoundException('Cannot find the toilet');
    return toilet;
  }

  async getToilets(getToiletsArgs: GetToiletsArgs): Promise<Toilet[]> {
    if (getToiletsArgs.street) {
      const cachedData = await this.cacheService.get<Toilet[]>(
        getToiletsArgs.street,
      );
      if (cachedData) return cachedData;
    }

    const toilets = await this.repository.getToilets({
      where: {
        OR: [
          {
            address: {
              street: getToiletsArgs.street,
            },
          },
          {
            address: {
              city: getToiletsArgs.city,
            },
          },
          {
            address: {
              country: getToiletsArgs.country,
            },
          },
        ],
      },
    });

    getToiletsArgs.street &&
      toilets.length !== 0 &&
      (await this.cacheService.set(getToiletsArgs.street, toilets));

    return toilets;
  }

  async createToilet(createToiletData: CreateToiletInput): Promise<Toilet> {
    const reviewPassword = await bcrypt.hash(
      createToiletData.reviews.password,
      10,
    );
    const toilet = await this.repository.createToilet({
      data: {
        ...createToiletData,
        address: {
          create: createToiletData.address,
        },
        reviews: {
          create: [
            {
              ...createToiletData.reviews,
              password: reviewPassword,
            },
          ],
        },
      },
    });
    return toilet;
  }

  async updateToilet(updateToiletData: UpdateToiletInput): Promise<Toilet> {
    const toilet = await this.repository.updateToilet({
      where: { id: updateToiletData.id },
      data: updateToiletData,
    });

    return toilet;
  }

  async deleteToilet(deleteToiletData: DeleteToiletInput): Promise<Toilet> {
    const toilet = await this.repository.deleteToilet({
      where: {
        id: deleteToiletData.id,
      },
    });

    return toilet;
  }

  async totalAggregate(): Promise<TotalAggregate> {
    return await this.repository.totalAggregate();
  }
}
