import { Document } from 'mongoose';

export interface CustomersProfile extends Document {
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly description: string;
}
