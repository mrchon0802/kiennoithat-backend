import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

/* ================= SIZE DIMENSIONS ================= */
@Schema({ _id: false })
export class SizeDimensions {
  @Prop({ type: [Number] })
  width?: number[];

  @Prop({ type: [Number] })
  length?: number[];

  @Prop({ type: [Number] })
  height?: number[];
}
export const SizeDimensionsSchema = SchemaFactory.createForClass(SizeDimensions);

/* ================= SIZE DEFAULT ================= */
@Schema({ _id: false })
export class SizeDefault {
  @Prop()
  width?: number;

  @Prop()
  length?: number;

  @Prop()
  height?: number;
}
export const SizeDefaultSchema = SchemaFactory.createForClass(SizeDefault);

/* ================= SIZE ================= */
@Schema({ _id: false })
export class Size {
  @Prop({ type: SizeDimensionsSchema, default: {} })
  dimensions!: SizeDimensions;

  @Prop({ type: SizeDefaultSchema, required: true })
  default!: SizeDefault;
}
export const SizeSchema = SchemaFactory.createForClass(Size);

/* ================= COLOR ================= */
@Schema({ _id: false })
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
  title!: string;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  weight!: number;

  @Prop({
    required: true,
    type: String,
    enum: ['bed', 'table', 'chair', 'cabinet', 'sofa', 'other'],
    index: true,
  })
  category!: string;

  @Prop({
    type: String,
    enum: ['hero', 'normal'],
    default: 'normal',
    index: true,
  })
  type!: 'hero' | 'normal';

  @Prop({
    type: [String],
    enum: ['living-room', 'bed-room', 'kitchen', 'home-office'],
    default: [],
    index: true,
  })
  room!: string[];

  @Prop({ type: SizeSchema, required: true })
  size!: Size;

  @Prop({ type: [ColorOptionSchema], default: [] })
  colors!: ColorOption[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

/* ================= INDEX ================= */
ProductSchema.index({ title: 'text' });