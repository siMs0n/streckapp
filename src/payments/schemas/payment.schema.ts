import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsInt, Min, Max } from 'class-validator';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Person } from 'src/persons/schemas/person.schema';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @IsInt()
  @Min(1)
  @Max(1000)
  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  reference: string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Person.name,
  })
  person: Types.ObjectId;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
