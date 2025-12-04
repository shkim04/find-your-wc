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
  // later: move this to config service
  private readonly CACHE_TTL_SECONDS = 300;

  constructor(
    private readonly repository: ToiletsRepository,
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
  ) {}

  async getToilet(args: GetToiletArgs): Promise<Toilet> {
    // Build a more robust where clause (no repeated address objects)
    const toilet = await this.repository.getToilet({
      where: {
        address: {
          streetNumber: args.streetNumber,
          street: args.street,
          city: args.city,
          country: args.country,
        },
      },
    });

    if (!toilet) {
      throw new NotFoundException(
        `Cannot find toilet at ${args.country} ${args.city} ${args.street} ${args.streetNumber}`,
      );
    }

    return toilet;
  }

  async getToilets(args: GetToiletsArgs): Promise<Toilet[]> {
    const cacheKey = this.buildCacheKey(args);

    if (cacheKey) {
      const cached = await this.cache.get<Toilet[]>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const orConditions: any[] = [];

    if (args.street) {
      orConditions.push({ address: { street: args.street } });
    }
    if (args.city) {
      orConditions.push({ address: { city: args.city } });
    }
    if (args.country) {
      orConditions.push({ address: { country: args.country } });
    }

    const where = orConditions.length > 0 ? { OR: orConditions } : {};

    const toilets = await this.repository.getToilets({ where });

    if (cacheKey && toilets.length > 0) {
      await this.cache.set(cacheKey, toilets, this.CACHE_TTL_SECONDS);
    }

    return toilets;
  }

  async createToilet(input: CreateToiletInput): Promise<Toilet> {
    const reviewsInput = input.reviews ?? [];

    const reviewsWithHashedPassword = await Promise.all(
      reviewsInput.map(async (review) => ({
        ...review,
        password: await bcrypt.hash(review.password, 10),
      })),
    );
    
    const toilet = await this.repository.createToilet({
      data: {
        isPaid: input.isPaid,
        price: input.price,
        address: input.address
          ? {
              create: input.address,
            }
          : undefined,
        reviews: reviewsWithHashedPassword.length
          ? {
              create: reviewsWithHashedPassword,
            }
          : undefined,
      },
    });

    // invalidate cache entries that might be affected
    await this.invalidateToiletsCacheForAddressLike(input.address);

    return toilet;
  }

  async updateToilet(input: UpdateToiletInput): Promise<Toilet> {
    const toilet = await this.repository.updateToilet({
      where: { id: input.id },
      data: {
        // be explicit about what can be updated
        isPaid: input.isPaid,
        price: input.price,
      },
    });

    await this.invalidateToiletsCacheForToilet(toilet);

    return toilet;
  }

  async deleteToilet(input: DeleteToiletInput): Promise<Toilet> {
    const toilet = await this.repository.deleteToilet({
      where: {
        id: input.id,
      },
    });

    await this.invalidateToiletsCacheForToilet(toilet);

    return toilet;
  }

  async totalAggregate(): Promise<TotalAggregate> {
    return this.repository.totalAggregate();
  }

  async getAddressForToilet(toiletId: number) {
    const toiletWithAddress = await this.repository.getToiletWithAddress({
      id: toiletId,
    });

    return toiletWithAddress?.address ?? null;
  }

  async getReviewsForToilet(toiletId: number) {
    const toiletWithReviews = await this.repository.getToiletWithReviews({
      id: toiletId,
    });

    return toiletWithReviews?.reviews ?? [];
  }

  // -----------------------
  // Private helpers
  // -----------------------

  private buildCacheKey(args: GetToiletsArgs): string | null {
    if (!args.street && !args.city && !args.country) {
      return null;
    }

    return ['toilets', args.country, args.city, args.street]
      .filter(Boolean)
      .join(':');
  }

  private async invalidateToiletsCacheForToilet(toilet: Toilet) {
    // if your Toilet model includes address, you can use it here
    const address: any = (toilet as any).address;
    if (!address) return;

    await this.invalidateToiletsCacheForAddressLike(address);
  }

  private async invalidateToiletsCacheForAddressLike(
    address?: { country?: string; city?: string; street?: string } | null,
  ) {
    if (!address) return;

    const possibleKeys = [
      this.buildCacheKey({
        country: address.country,
        city: address.city,
        street: address.street,
      } as GetToiletsArgs),
      this.buildCacheKey({
        country: address.country,
        city: address.city,
      } as GetToiletsArgs),
      this.buildCacheKey({
        country: address.country,
      } as GetToiletsArgs),
    ].filter(Boolean) as string[];

    await Promise.all(possibleKeys.map((key) => this.cache.del(key)));
  }
}
