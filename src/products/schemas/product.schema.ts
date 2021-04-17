import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsInt } from 'class-validator';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @IsInt()
  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  available: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
