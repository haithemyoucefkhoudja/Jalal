// models/request.ts

import mongoose, { Schema, model, Document } from 'mongoose';

interface Media {
  data: string;
  type: string;
}

export interface IRequest extends Document {
  name: string;
  email: string;
  description: string;
  status: string;
  media: Media[];
  createdAt: Date;
  updatedAt: Date;
}

const mediaSchema = new Schema<Media>({
  data: { type: String, required: true },
  type: { type: String, required: true },
});

const requestSchema = new Schema<IRequest>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: 'PENDING' },
  media: [mediaSchema],
}, {
  timestamps: true,
});

export const RequestModel = mongoose.models.Request || model<IRequest>('Request', requestSchema);
