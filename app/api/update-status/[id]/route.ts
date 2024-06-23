import { NextRequest, NextResponse } from 'next/server';
import {RequestModel} from '@/models/request';
import connectMongoDB  from '@/lib/mongoDB';
import { MeetingModel } from '@/models/meeting';


export async function POST(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  
  try {
    const { newStatus, type } = await req.json();
    const requestID = params.id
    console.log('dsf:',requestID, newStatus);
    if (!requestID || !newStatus || !['APPROVED', 'REJECTED'].includes(newStatus)) {
      return NextResponse.json({ message: 'Invalid status or request ID' }, { status: 400 });
    }
    await connectMongoDB()
    let document;
    if (type === 'REQUEST') {
      document = await RequestModel.findById(requestID);
    } else if (type === 'MEETING') {
      document = await MeetingModel.findById(requestID);
    } else {
      return NextResponse.json({ message: 'Invalid type' }, { status: 400 });
    }
    
    if (!document) {
      return NextResponse.json({ message: `${type.toLowerCase()} not found` }, { status: 404 });
    }

    if (document.status !== 'PENDING') {
      return NextResponse.json({ message: 'Status change not allowed' }, { status: 400 });
    }

    document.status = newStatus;
    await document.save();

    return NextResponse.json(document);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }

}
