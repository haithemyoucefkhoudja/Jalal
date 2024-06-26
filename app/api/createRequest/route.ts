import { NextRequest, NextResponse } from 'next/server';

import { IRequest, RequestModel } from '@/models/request';
import connectMongoDB  from '@/lib/mongoDB';
import { IMeeting, MeetingModel } from '@/models/meeting';


const createRequest = async (req:IRequest):Promise<IRequest | null> => {
    try {
      const transaction:IRequest = new RequestModel(req);

      const savedTransaction = await transaction.save();
      return savedTransaction;
    } catch (error:any) {
        // Handle other errors
        console.error('Error creating transaction:', error);
        return null;
      }
}

const createMeeting = async (req:IMeeting):Promise<IMeeting | null > => {
  try {
    const transaction:IMeeting = new MeetingModel(req);
    const savedTransaction = await transaction.save();
    return savedTransaction;
  } catch (error:any) {
      // Handle other errors
      console.error('Error creating transaction:', error);
      return null;
    }
}
    
async function helper(req:NextRequest) {
    const data = await req.json();
    const {_req, type} = JSON.parse(data.body);
    let transaction;
    await connectMongoDB();
    if (type === 'REQUEST') {
      transaction = await createRequest(_req);
    } else if (type === 'MEETING') {
      transaction = await createMeeting(_req);
    } else {
      return new NextResponse(JSON.stringify({ error: 'Invalid type' }), { status: 400,  });
    }
    if (!transaction) {
      return new NextResponse(JSON.stringify({ error: 'Unsuccessful operation' }), { status: 500 });
    }

    return new NextResponse(JSON.stringify({ message: 'Success' }), { status: 200 });
      
}
    

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        return await helper(req);
    } 
    catch(error:any){           
      console.log('Error:', error.message)
    return new NextResponse(JSON.stringify({ error: 'unsecessful operation' }), { status: 500 });
    } 
}