import mongoose, { connect, connection } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import {
  Product,
  ProductSchema,
  ProductDocument,
} from '../../src/product/product.schema';

// ---- Interface cho JSON ----
interface Size {
  width: string[];
  length: string;
  height: string;
}

interface ColorOption {
  name: string;
  image: string;
  productImage: string;
}

interface Feature {
  image: string;
  description: string;
}

interface ProductJson {
  productId: string;
  image: string;
  title: string;
  price: number;
  size: Size;
  colors: ColorOption[];
  features: Feature[];
}

export async function seedProduct() {
 // 1. Connect MongoDB
    await connect('mongodb://127.0.0.1:27017/kiennoithat');
    console.log('✅ Connected to MongoDB');

    // 2. Đọc file product.json
    const filePath = path.join(__dirname, '..', 'data', 'product.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const products = JSON.parse(rawData) as ProductJson[];

    // 3. Khởi tạo model tạm (không qua Nest)
    const ProductModel = mongoose.model<ProductDocument>(
      Product.name,
      ProductSchema as mongoose.Schema,
    );

    // 4. Xóa cũ, insert mới
    await ProductModel.deleteMany({});
    await ProductModel.insertMany(products);

    console.log(`🎉 Seeded ${products.length} products`);
}

seedProduct();
