import mongoose from 'mongoose';
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
  console.log('🌱 Seeding product nav items...');

  // ❌ Không tự connect nếu đang được gọi từ seedAll.ts
  if (!mongoose.connection || mongoose.connection.readyState === 0) {
    throw new Error('❌ MongoDB not connected. Call this after connecting!');
  }
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

// ⚙️ Nếu chạy trực tiếp file này (node seed-product-nav-item.ts)
if (require.main === module) {
  import('dotenv').then(async ({ config }) => {
    config(); // load .env nếu có
    const uri =
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kiennoithat';

    await mongoose.connect(uri);
    console.log(`✅ Connected to MongoDB: ${uri}`);

    await seedProductNavItem();

    await mongoose.connection.close();
    console.log('🔒 Connection closed');
    process.exit(0);
  });
}
