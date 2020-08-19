import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Organization extends Document {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'Customer' })
  customers: string
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);

