import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsInt } from 'class-validator';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Instance } from 'src/instances/schemas/instance.schema';
import { ProductCategory } from 'src/product-categories/schemas/product-category.schema';

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

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: ProductCategory.name,
  })
  category: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Instance.name,
    index: true,
  })
  instance: Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
