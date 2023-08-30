import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Toilet } from './models/toilet';

import { CreateToiletInput } from './dto/input/create-toilet.input';
import { UpdateToiletInput } from './dto/input/update-toilet.input';
import { DeleteToiletInput } from './dto/input/delete-toilet.input';

import { GetToiletArgs } from './dto/args/get-toilet.args';
import { GetToiletsArgs } from './dto/args/get-toilets.args';

import { ToiletsRepository } from './toilets.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ToiletsService {
  constructor(
    private repository: ToiletsRepository,
    @Inject(CACHE_MANAGER) private cacheService: Cache,
  ) {}

  async getToilet(getToiletArgs: GetToiletArgs): Promise<Toilet> {
    const toilet = await this.repository.getToilet({
      where: { id: getToiletArgs.id },
    });

    if (!toilet) throw new NotFoundException('Cannot find the toilet');
    return toilet;
  }

  async getToilets(getToiletsArgs: GetToiletsArgs): Promise<Toilet[]> {
    const cachedData = await this.cacheService.get<Toilet[]>(
      getToiletsArgs.street,
    );
    if (cachedData) return cachedData;

    const toliets = await this.repository.getToilets({
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
      toliets.length !== 0 &&
      (await this.cacheService.set(getToiletsArgs.street, toliets));

    return toliets;
  }

  async createToilet(createToiletData: CreateToiletInput): Promise<Toilet> {
    const reviewPassword = await bcrypt.hash(
      createToiletData.reviews.password,
      10,
    );
    const toilet = await this.repository.createToilet({
      data: {
        id: uuidv4(),
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
}
