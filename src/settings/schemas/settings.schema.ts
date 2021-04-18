import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema()
export class Settings {
  @Prop()
  pin: string;

  @Prop()
  swishPhoneNumber: string;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
