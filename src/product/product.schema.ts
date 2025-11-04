import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Size {
  @Prop({ type: [String], required: true })
  width!: string[];

  @Prop({ required: true })
  length!: string;

  @Prop({ required: true })
  height!: string;
}
export const SizeSchema = SchemaFactory.createForClass(Size);

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

@Schema({ _id: true })
export class Feature {
  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  description!: string;
}
export const FeatureSchema = SchemaFactory.createForClass(Feature);

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true, unique: true })
  productId!: string;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  weight!: string;

  // ❌ Xóa width, height, length dư thừa
  // ✅ chỉ giữ Size object đúng theo JSON
  @Prop({ type: SizeSchema, required: true })
  size!: Size;

  @Prop({ type: [ColorOptionSchema], default: [] })
  colors!: ColorOption[];

  @Prop({ type: [FeatureSchema], default: [] })
  features!: Feature[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
