import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Banner, BannerDocument } from './banner.schema';

@Injectable()
export class BannerService {
  constructor(
    @InjectModel(Banner.name) private bannerModel: Model<BannerDocument>,
  ) {}

  async findAll(): Promise<BannerDocument[]> {
    return this.bannerModel.find().exec();
  }

  async findOne(id: string): Promise<BannerDocument | null> {
    return this.bannerModel.findById(id).exec();
  }

  async create(data: Partial<Banner>): Promise<BannerDocument> {
    const banner = new this.bannerModel(data);
    return banner.save();
  }
}
