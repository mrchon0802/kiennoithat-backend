import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    credentials: true,
  });

  mongoose.connection.once('open', () => {
    console.log('✅ Connected to MongoDB Atlas');
  });
  mongoose.connection.on('error', (err) => {
    console.error('❌ MongoDB connection error:', err);
  });

  await app.listen(process.env.PORT || 5000, '0.0.0.0');
  console.log(`✅ Backend running on port ${process.env.PORT || 5000}`);
}
bootstrap();
