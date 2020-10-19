import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Customer extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: true})
  email: string;

  @Prop()
  phone: string;
  
  @Prop()
  address: string;
  
  @Prop()
  description: string;

  @Prop({ type: [Types.ObjectId], ref: 'Organization' })
  organizations: string
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
