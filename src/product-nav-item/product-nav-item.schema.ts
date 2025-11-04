import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductNavItemDocument = ProductNavItem & Document;

@Schema({ _id: true })
export class Button {
  @Prop({ required: true })
  label!: string;

  @Prop({ required: true })
  link!: string;
}

export const ButtonSchema = SchemaFactory.createForClass(Button);

@Schema({ timestamps: true })
export class ProductNavItem {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  image!: string;

  @Prop({ required: true })
  link!: string;

  @Prop({ type: [ButtonSchema], default: [] })
  button!: Button[];
}

export const ProductNavItemSchema =
  SchemaFactory.createForClass(ProductNavItem);
