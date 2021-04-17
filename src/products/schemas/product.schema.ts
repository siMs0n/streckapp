import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

export type Ingredient = {
  name: string;
  quantity: number | null;
  unit: string | null;
  quantityAndUnitLabel: string;
};

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  @Prop()
  price: number;

  @Prop({ required: true })
  @Prop()
  available: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
