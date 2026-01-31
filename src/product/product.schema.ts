import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

/* ================= SIZE ================= */
@Schema({ _id: false })
export class Size {
  @Prop({ type: [String], required: true })
  width!: string[];

  @Prop({ required: true })
  length!: string;

  @Prop({ required: true })
  height!: string;
}
export const SizeSchema = SchemaFactory.createForClass(Size);

/* ================= COLOR ================= */
@Schema()
export class ColorOption {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  productImage!: string;
}
export const ColorOptionSchema = SchemaFactory.createForClass(ColorOption);

/* ================= PRODUCT ================= */
@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true, index: true })
  productId!: string;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  weight!: string;

  @Prop({
    type: String,
    enum: ['hero', 'normal'],
    default: 'normal',
    index: true,
  })
  type!: 'hero' | 'normal';

  @Prop({ type: SizeSchema, required: true })
  size!: Size;

  @Prop({ type: [ColorOptionSchema], default: [] })
  colors!: ColorOption[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ title: 'text' });
