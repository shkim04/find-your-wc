import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Toilet } from './models/toilets';
import { CreateToiletInput } from './dto/input/create-toilet.input';
import { UpdateToiletInput } from './dto/input/update-user.input';
import { GetToiletArgs } from './dto/args/get-toilet.args';
import { GetToiletsArgs } from './dto/args/get-toilets.args';
import { DeleteToiletInput } from './dto/input/delete-toilet.input';

@Injectable()
export class ToiletsService {
  private toilets: Toilet[] = [];

  public createToilet(createToiletData: CreateToiletInput): Toilet {
    const toilet: Toilet = {
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...createToiletData,
    };

    this.toilets.push(toilet);

    return toilet;
  }
  public updateToilet(updateToiletData: UpdateToiletInput): Toilet {
    const toilet = this.toilets.find(
      (toilet) => toilet.id === updateToiletData.id,
    );

    Object.assign(toilet, updateToiletData);
    return toilet;
  }
  public getToilet(getToiletArgs: GetToiletArgs): Toilet {
    return this.toilets.find((toilet) => toilet.id === getToiletArgs.id);
  }
  public getToilets(getToiletsArgs: GetToiletsArgs): Toilet[] {
    return getToiletsArgs.ids.map((id) => this.getToilet({ id }));
  }
  public deleteToilets(deleteToiletData: DeleteToiletInput): Toilet {
    const toiletIndex = this.toilets.findIndex(
      (toilet) => toilet.id === deleteToiletData.id,
    );
    const toilet = this.toilets[toiletIndex];

    this.toilets.splice(toiletIndex);
    return toilet;
  }
}
