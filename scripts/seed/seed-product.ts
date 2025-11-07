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
  console.log('🌱 Seeding products...');

  // ❌ Không tự connect nếu được gọi từ seedAll.ts
  if (!mongoose.connection || mongoose.connection.readyState === 0) {
    throw new Error('❌ MongoDB not connected. Call this after connecting!');
  }

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

// ⚙️ Nếu chạy trực tiếp file này (node seed-product.ts)
if (require.main === module) {
  import('dotenv').then(async ({ config }) => {
    config(); // load .env nếu có
    const uri =
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kiennoithat';

    await mongoose.connect(uri);
    console.log(`✅ Connected to MongoDB: ${uri}`);

    await seedProduct();

    await mongoose.connection.close();
    console.log('🔒 Connection closed');
    process.exit(0);
  });
}
