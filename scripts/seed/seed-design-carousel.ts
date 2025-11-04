import mongoose, { connect, connection, Schema } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import {
  DesignCarousel,
  DesignCarouselSchema,
  DesignCarouselDocument,
} from '../../src/design-carousel/design-carousel.schema';

interface DesignCarouselJson {
  title: string;
  description?: string;
  image: string;
  button: string;
}

export async function seedDesignCarousel() {
  await connect('mongodb://127.0.0.1:27017/kiennoithat');
    console.log('✅ Connected to MongoDB');

    const filePath = path.join(__dirname, '..', 'data', 'designCarousel.json');
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const items = JSON.parse(rawData) as unknown as DesignCarouselJson[];

    const DesignCarouselModel = mongoose.model<DesignCarouselDocument>(
      DesignCarousel.name,
      DesignCarouselSchema as Schema,
    );

    await DesignCarouselModel.deleteMany({});
    await DesignCarouselModel.insertMany(items);

    console.log(`🎉 Seeded ${items.length} design carousel items`);
}

seedDesignCarousel();
