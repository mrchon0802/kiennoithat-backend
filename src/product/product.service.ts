import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productModel.findOne({ productId: id }).lean().exec();
  }

  async create(data: Partial<Product>): Promise<Product> {
    const created = new this.productModel(data);
    const saved = await created.save();
    return saved.toObject();
  }

  async createMany(data: Partial<Product>[]): Promise<Product[]> {
    const created = await this.productModel.insertMany(data);
    return created.map((doc) => doc.toObject());
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    return this.productModel
      .findOneAndUpdate({ productId: id }, data, { new: true })
      .lean()
      .exec();
  }

  async remove(id: string): Promise<Product | null> {
    return this.productModel
      .findOneAndDelete({ productId: id })
      .lean()
      .exec();
  }
}
