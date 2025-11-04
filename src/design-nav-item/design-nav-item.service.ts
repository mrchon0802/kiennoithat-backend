import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DesignNavItem, DesignNavItemDocument } from './design-nav-item.schema';

@Injectable()
export class DesignNavItemService {
  constructor(
    @InjectModel(DesignNavItem.name)
    private readonly designNavItemModel: Model<DesignNavItemDocument>,
  ) {}

  async findAll(): Promise<DesignNavItem[]> {
    return this.designNavItemModel.find().exec();
  }

  async findOne(id: string): Promise<DesignNavItem | null> {
    return this.designNavItemModel.findById(id).exec();
  }

  async create(data: Partial<DesignNavItem>): Promise<DesignNavItem> {
    const created = new this.designNavItemModel(data);
    return created.save();
  }

  async update(
    id: string,
    data: Partial<DesignNavItem>,
  ): Promise<DesignNavItem | null> {
    return this.designNavItemModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async remove(id: string): Promise<DesignNavItem | null> {
    return this.designNavItemModel.findByIdAndDelete(id).exec();
  }
}
