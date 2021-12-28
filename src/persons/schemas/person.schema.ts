import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Instance } from 'src/instances/schemas/instance.schema';

export type PersonDocument = Person & Document;

@Schema()
export class Person {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  balance: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Instance.name,
    index: true,
  })
  instance: Types.ObjectId;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
