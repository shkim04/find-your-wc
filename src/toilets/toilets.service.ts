import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Toilet } from './models/toilet';
import { CreateToiletInput } from './dto/input/create-toilet.input';
import { UpdateToiletInput } from './dto/input/update-toilet.input';
import { GetToiletArgs } from './dto/args/get-toilet.args';
import { GetToiletsArgs } from './dto/args/get-toilets.args';
import { DeleteToiletInput } from './dto/input/delete-toilet.input';

@Injectable()
export class ToiletsService {
  private toilets: Toilet[] = [];

  public async getToilet(getToiletArgs: GetToiletArgs): Promise<Toilet> {
    return this.toilets.find((toilet) => toilet.id === getToiletArgs.id);
  }
  public async getToilets(getToiletsArgs: GetToiletsArgs): Promise<Toilet[]> {
    return this.toilets.filter(
      (toilet) => getToiletsArgs.ids.indexOf(toilet.id) !== -1,
    );
  }

  public async createToilet(
    createToiletData: CreateToiletInput,
  ): Promise<Toilet> {
    const toilet: Toilet = {
      id: uuidv4(),
      ...createToiletData,
    };

    this.toilets.push(toilet);

    return toilet;
  }
  public async updateToilet(
    updateToiletData: UpdateToiletInput,
  ): Promise<Toilet> {
    const toilet = this.toilets.find(
      (toilet) => toilet.id === updateToiletData.id,
    );

    Object.assign(toilet, updateToiletData);
    return toilet;
  }

  public async deleteToilet(
    deleteToiletData: DeleteToiletInput,
  ): Promise<Toilet> {
    const toiletIndex = this.toilets.findIndex(
      (toilet) => toilet.id === deleteToiletData.id,
    );
    const toilet = this.toilets[toiletIndex];

    this.toilets = this.toilets.filter(
      (toilet, index) => index !== toiletIndex,
    );

    return toilet;
  }
}
