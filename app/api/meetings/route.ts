import connectMongoDB from "@/lib/mongoDB";
import { IMeeting, MeetingModel } from "@/models/meeting";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {page} = await req.json();
    const limit = 20;
    const skip = (page - 1) * limit;
    try {
      await connectMongoDB();
      const meetings:IMeeting[] = await MeetingModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();
      if(!meetings)
        return NextResponse.json(
          { error: 'Something went wrong:\n NOT-FOUND' },
          { status: 404 }
        );
        
        return NextResponse.json({ meetings: meetings });
      } catch (error:any) {
        return NextResponse.json(
          { error: 'Something went wrong:\n'.concat(error.message) },
          { status: 500 }
        );
      }
    
}