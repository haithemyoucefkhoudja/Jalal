import connectMongoDB from "@/lib/mongoDB";
import { IRequest, RequestModel } from "@/models/request";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {page} = await req.json();
    const limit = 20;
    const skip = (page - 1) * limit;
    try {
      await connectMongoDB();
      const reqs:IRequest[] = await RequestModel.find()
      .select('status description email name _id createdAt updatedAt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
      console.log(reqs)
      if(!reqs)
        return NextResponse.json(
          { error: 'Something went wrong:\n NOT-FOUND' },
          { status: 404 }
        );
        
        return NextResponse.json({ requests: reqs });
      } catch (error:any) {
        return NextResponse.json(
          { error: 'Something went wrong:\n'.concat(error.message) },
          { status: 500 }
        );
      }
    
}