import mongoose from 'mongoose';
import { config } from 'dotenv';

// Import trực tiếp các hàm seed từ các file riêng
import { seedBanner } from './seed-banner';
import { seedDesignCarousel } from './seed-design-carousel';
import { seedDesignNavItem } from './seed-design-nav-item';
import { seedProduct } from './seed-product';
import { seedProductNavItem } from './seed-product-nav-item';

async function seedAll() {
  try {
    const uri =
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kiennoithat';
    console.log(`🔌 Connecting to MongoDB: ${uri}`);

    // 1. Connect DB chỉ 1 lần
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB');

    // 2. Gọi từng seed function
    await seedBanner();
    await seedDesignCarousel();
    await seedDesignNavItem();
    await seedProduct();
    await seedProductNavItem();

    console.log('🎉 All seeders executed successfully!');
  } catch (err) {
    console.error('❌ Error in seedAll:', err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

seedAll();
