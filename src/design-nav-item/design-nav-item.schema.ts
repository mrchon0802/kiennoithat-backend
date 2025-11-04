import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DesignNavItemDocument = HydratedDocument<DesignNavItem>;

@Schema({ timestamps: true })
export class DesignNavItem {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  image!: string;
}

export const DesignNavItemSchema = SchemaFactory.createForClass(DesignNavItem);
