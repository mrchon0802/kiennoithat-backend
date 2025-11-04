import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { MongooseModule } from '@nestjs/mongoose';
import { BannerModule } from './banner/banner.module';
import { DesignCarouselModule } from './design-carousel/design-carousel.module';
import { DesignNavItemModule } from './design-nav-item/design-nav-item.module';
import { ProductModule } from './product/product.module';
import { ProductNavItemModule } from './product-nav-item/product-nav-item.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [
    //load .env
    ConfigModule.forRoot({ isGlobal: true }),

    //ket noi mongodb atlas
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
        connectionFactory: (connection) => {
          console.log('✅ Connected to MongoDB:', connection.name);
          return connection;
        },
      }),
      inject: [ConfigService],
    }),
    BannerModule,
    DesignCarouselModule,
    DesignNavItemModule,
    ProductModule,
    ProductNavItemModule,
    OrderModule,
    UserModule,
    AuthModule,
    CartModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}
