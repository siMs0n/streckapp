import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Instance } from 'src/instances/schemas/instance.schema';

export type ProductCategoryDocument = ProductCategory & Document;

@Schema()
export class ProductCategory {
  @Prop({ required: true })
  name: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Instance.name,
    index: true,
  })
  instance: Types.ObjectId;
}

export const ProductCategorySchema = SchemaFactory.createForClass(
  ProductCategory,
);
