import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DesignCarouselDocument = HydratedDocument<DesignCarousel>;

@Schema({ timestamps: true })
export class DesignCarousel {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop({ required: true })
  image?: string;

  @Prop({ required: true })
  button?: string;
}

export const DesignCarouselSchema =
  SchemaFactory.createForClass(DesignCarousel);
