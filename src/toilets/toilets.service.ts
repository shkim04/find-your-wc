import { Inject, Injectable } from '@nestjs/common';
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

  public async getToilet(getToiletArgs: GetToiletArgs): Promise<Toilet> {
    const cachedData = await this.cacheService.get<Toilet>(getToiletArgs.id);
    if (cachedData) return cachedData;

    const toilet = await this.repository.getToilet({
      where: { id: getToiletArgs.id },
    });

    await this.cacheService.set(getToiletArgs.id, toilet);
    return toilet;
  }

  public async getToilets(getToiletsArgs: GetToiletsArgs): Promise<Toilet[]> {
    const toliets = await this.repository.getToilets({
      where: {
        OR: [
          { id: { in: getToiletsArgs.ids } },
          {
            address: {
              street: { in: getToiletsArgs.streets },
            },
          },
          {
            address: {
              city: { in: getToiletsArgs.cities },
            },
          },
          {
            address: {
              country: { in: getToiletsArgs.countries },
            },
          },
        ],
      },
    });

    return toliets;
  }

  public async createToilet(
    createToiletData: CreateToiletInput,
  ): Promise<Toilet> {
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

  public async updateToilet(
    updateToiletData: UpdateToiletInput,
  ): Promise<Toilet> {
    const toilet = await this.repository.updateToilet({
      where: { id: updateToiletData.id },
      data: updateToiletData,
    });

    return toilet;
  }

  public async deleteToilet(
    deleteToiletData: DeleteToiletInput,
  ): Promise<Toilet> {
    const toilet = await this.repository.deleteToilet({
      where: {
        id: deleteToiletData.id,
      },
    });

    return toilet;
  }
}
