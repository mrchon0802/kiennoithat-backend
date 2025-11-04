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
  await connect('mongodb://127.0.0.1:27017/kiennoithat');
    console.log('✅ Connected to MongoDB');

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

seedDesignNavItem();
