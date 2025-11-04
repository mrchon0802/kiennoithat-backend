import mongoose, { connect, connection } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import {
  ProductNavItem,
  ProductNavItemSchema,
  ProductNavItemDocument,
} from '../../src/product-nav-item/product-nav-item.schema';

interface Button {
  label: string;
  link: string;
}

interface ProductNavItemJson {
  title: string;
  image: string;
  link: string;
  button: Button[];
}

export async function seedProductNavItem() {
   // 1. Kết nối DB
    await connect('mongodb://127.0.0.1:27017/kiennoithat');
    console.log('✅ Connected to MongoDB');

    // 2. Load file JSON
    const filePath = path.join(__dirname, '..', 'data', 'productNavItem.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const items = JSON.parse(rawData) as ProductNavItemJson[];

    // 3. Tạo model tạm
    const ProductNavItemModel = mongoose.model<ProductNavItemDocument>(
      ProductNavItem.name,
      ProductNavItemSchema as mongoose.Schema, // không cần as Schema, ngắn gọn hơn
    );

    // 4. Xóa dữ liệu cũ
    await ProductNavItemModel.deleteMany({});

    // 5. Thêm dữ liệu mới
    await ProductNavItemModel.insertMany(items);

    console.log(`🎉 Seeded ${items.length} product nav items`);
}

seedProductNavItem();
