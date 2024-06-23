// models/request.ts

import { FileInfo } from '@/types/Media';
import { RequestStatus } from '@/types/request';
import mongoose, { Schema, model, Document } from 'mongoose';


export interface IRequest extends Document {
  _id:string;
  name: string;
  email: string;
  descreption: string;
  status: RequestStatus;
  media: FileInfo[];
  createdAt: Date;
  updatedAt: Date;
}
export interface IFileInfo extends FileInfo , Document{

}

const mediaSchema = new Schema<IFileInfo>({
  customId: { type: String,},
  key: { type: String, },
  name: { type: String },
  serverData: { type: String },
  size:{ type: Number },
  type:{ type: String },
  url:{ type: String }
});

const requestSchema = new Schema<IRequest>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  descreption: { type: String, required: true },
  status: { type: String, default: 'PENDING',
    enum: [ 
      'PENDING', 
      'APPROVED', 
      'REJECTED',
    ]
   },
  media: [mediaSchema],
}, {
  timestamps: true,
});
export const RequestModel = mongoose.models.Request || model<IRequest>('Request', requestSchema);
