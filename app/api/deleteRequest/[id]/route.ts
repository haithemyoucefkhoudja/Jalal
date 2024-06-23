import { NextRequest, NextResponse } from 'next/server';
import {RequestModel} from '@/models/request';
import connectMongoDB  from '@/lib/mongoDB';


export async function GET(req: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
  
  try {
    const transactionId = params.id
    await connectMongoDB()

    const transaction = await RequestModel.deleteOne({_id:transactionId});
    if (!transaction) {
      return NextResponse.json({ message: 'Transaction not found' }, { status: 404 });
    }
    return NextResponse.json(transaction);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }

}
