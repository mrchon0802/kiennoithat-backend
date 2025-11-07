import mongoose, { connect, connection, Schema } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import {
  DesignNavItem,
  DesignNavItemSchema,
  DesignNavItemDocument,
} from '../../src/design-nav-item/design-nav-item.schema';

interface DesignNavItemJson {
  title: string;
  image: string;
}

export async function seedDesignNavItem() {
  // ❌ Không connect() nếu đã có kết nối sẵn (từ seedAll.ts)
  if (connection.readyState === 0) {
    throw new Error('❌ MongoDB not connected. Call this after connecting!');
  }

  const filePath = path.join(__dirname, '..', 'data', 'designNavItem.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  const items = JSON.parse(rawData) as unknown as DesignNavItemJson[];

  const DesignNavItemModel = mongoose.model<DesignNavItemDocument>(
    DesignNavItem.name,
    DesignNavItemSchema as Schema, // 👈 cast để hết warning
  );

  await DesignNavItemModel.deleteMany({});
  await DesignNavItemModel.insertMany(items);

  console.log(`🎉 Seeded ${items.length} design nav items`);
}

// ⚙️ Nếu chạy trực tiếp file này (node seed-design-nav-item.ts)
if (require.main === module) {
  import('dotenv').then(async ({ config }) => {
    config(); // load .env nếu có
    const uri =
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kiennoithat';

    await mongoose.connect(uri);
    console.log(`✅ Connected to MongoDB: ${uri}`);

    await seedDesignNavItem();

    await mongoose.connection.close();
    console.log('🔒 Connection closed');
    process.exit(0);
  });
}
