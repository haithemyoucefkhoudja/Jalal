import connectMongoDB from "@/lib/mongoDB";
import { IRequest, RequestModel } from "@/models/request";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req:NextRequest) {
    const {req_id} = await req.json();
    try {
      
        await connectMongoDB();
        const req:IRequest | null = await RequestModel.findById(req_id).select('media').exec();
        if(!req)
          return NextResponse.json(
            { error: 'Something went wrong:\n NOT-FOUND' },
            { status: 404 }
          );
        const media = req.media
        if(media.length == 0)
            return NextResponse.json(
                { error: 'Something went wrong:\n'.concat('no Media Was Found') },
                { status: 404 }
              );    
        return NextResponse.json({ media: media });
      } catch (error:any) {
        return NextResponse.json(
          { error: 'Something went wrong:\n'.concat(error.message) },
          { status: 500 }
        );
      }
    
}