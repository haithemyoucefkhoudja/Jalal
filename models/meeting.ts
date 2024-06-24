import { RequestStatus } from '@/types/request';
import mongoose, { Schema, model, Document } from 'mongoose';


export interface IMeeting extends Document {
  _id:string;
  name: string;
  email: string;
  descreption: string;
  status: RequestStatus;
  appointment: string;
  createdAt: Date;
  updatedAt: Date;
}


const meetingSchema = new Schema<IMeeting>({
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
   appointment:{type:String, required:true},
}, {
  timestamps: true,
});
export const MeetingModel = mongoose.models.Meeting || model<IMeeting>('Meeting', meetingSchema);
