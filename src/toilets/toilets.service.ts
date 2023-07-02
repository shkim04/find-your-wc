import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Toilet } from './models/toilet';

import { CreateToiletInput } from './dto/input/create-toilet.input';
import { UpdateToiletInput } from './dto/input/update-toilet.input';
import { DeleteToiletInput } from './dto/input/delete-toilet.input';

import { GetToiletArgs } from './dto/args/get-toilet.args';
import { GetToiletsArgs } from './dto/args/get-toilets.args';

import { ToiletsRepository } from './toilets.repository';

@Injectable()
export class ToiletsService {
  constructor(private repository: ToiletsRepository) {}

  public async getToilet(getToiletArgs: GetToiletArgs): Promise<Toilet> {
    return await this.repository.getToilet({
      where: { id: getToiletArgs.id },
    });
  }
  public async getToilets(getToiletsArgs: GetToiletsArgs): Promise<Toilet[]> {
    return await this.repository.getToilets({
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
  }

  public async createToilet(
    createToiletData: CreateToiletInput,
  ): Promise<Toilet> {
    const toilet = await this.repository.createToilet({
      data: {
        id: uuidv4(),
        ...createToiletData,
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
