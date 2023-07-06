import { Document } from 'mongoose';

export interface OrganizationsProfile extends Document {
  readonly name: string;
  readonly address: string;
  readonly description: string;
}
