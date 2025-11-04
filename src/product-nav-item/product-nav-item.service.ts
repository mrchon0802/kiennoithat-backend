import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ProductNavItem,
  ProductNavItemDocument,
} from './product-nav-item.schema';

@Injectable()
export class ProductNavItemService {
  constructor(
    @InjectModel(ProductNavItem.name)
    private productNavItemModel: Model<ProductNavItemDocument>,
  ) {}

  async findAll(): Promise<ProductNavItemDocument[]> {
    return this.productNavItemModel.find().exec();
  }

  async findOne(id: string): Promise<ProductNavItemDocument | null> {
    return this.productNavItemModel.findById(id).exec();
  }

  async create(data: Partial<ProductNavItem>): Promise<ProductNavItemDocument> {
    const item = new this.productNavItemModel(data);
    return item.save();
  }

  async createMany(
    data: Partial<ProductNavItem>[],
  ): Promise<ProductNavItemDocument[]> {
    return (await this.productNavItemModel.insertMany(
      data,
    )) as ProductNavItemDocument[];
  }

  async update(
    id: string,
    data: Partial<ProductNavItem>,
  ): Promise<ProductNavItemDocument | null> {
    return this.productNavItemModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
  }

  async remove(id: string): Promise<ProductNavItemDocument | null> {
    return this.productNavItemModel.findByIdAndDelete(id).exec();
  }
}
