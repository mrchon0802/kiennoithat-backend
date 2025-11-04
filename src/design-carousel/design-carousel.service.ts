import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DesignCarousel,
  DesignCarouselDocument,
} from './design-carousel.schema';

@Injectable()
export class DesignCarouselService {
  constructor(
    @InjectModel(DesignCarousel.name)
    private designCarouselModel: Model<DesignCarouselDocument>,
  ) {}

  async findAll(): Promise<DesignCarousel[]> {
    return this.designCarouselModel.find().exec();
  }

  async findOne(id: string): Promise<DesignCarousel | null> {
    return this.designCarouselModel.findById(id).exec();
  }

  async create(data: Partial<DesignCarousel>): Promise<DesignCarousel> {
    const created = new this.designCarouselModel(data);
    return created.save();
  }

  async update(
    id: string,
    data: Partial<DesignCarousel>,
  ): Promise<DesignCarousel | null> {
    return this.designCarouselModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async delete(id: string): Promise<DesignCarousel | null> {
    return this.designCarouselModel.findByIdAndDelete(id).exec();
  }
}
