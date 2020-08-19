import { Document } from 'mongoose';

export interface IOrganization extends Document {
  readonly name: string;
  readonly address: string;
  readonly description: string;
}
