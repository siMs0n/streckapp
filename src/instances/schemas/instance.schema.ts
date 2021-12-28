import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InstanceDocument = Instance & Document;

@Schema()
export class Instance {
  @Prop()
  name: string;

  @Prop()
  year: number;

  @Prop()
  pin: string;

  @Prop()
  swishPhoneNumber: string;
}

export const InstanceSchema = SchemaFactory.createForClass(Instance);
