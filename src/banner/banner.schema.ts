import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BannerDocument = Banner & Document;

@Schema({ _id: false })
export class Button {
  @Prop()
  label!: string;

  @Prop()
  link!: string;
}

export const ButtonSchema = SchemaFactory.createForClass(Button);

@Schema({ timestamps: true })
export class Banner {
  @Prop({ required: true })
  title!: string;

  @Prop()
  description?: string;

  @Prop()
  image?: string;

  @Prop({ type: [ButtonSchema] })
  buttons?: Button[];
}

export const BannerSchema = SchemaFactory.createForClass(Banner);
