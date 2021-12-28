import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsInt, Min, Max } from 'class-validator';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Person } from 'src/persons/schemas/person.schema';
import { Product } from 'src/products/schemas/product.schema';
import { Instance } from 'src/instances/schemas/instance.schema';

export type PurchaseDocument = Purchase & Document;

@Schema({ timestamps: true })
export class Purchase {
  @IsInt()
  @Min(1)
  @Max(1000)
  @Prop({ required: true })
  amount: number;

  @IsInt()
  @Min(1)
  @Prop({ required: true })
  unitPrice: number;

  @IsInt()
  @Min(1)
  @Max(50)
  @Prop({ required: true })
  quantity: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Product.name,
  })
  product: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Person.name,
  })
  person: Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Instance.name,
  })
  instance: Types.ObjectId;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
