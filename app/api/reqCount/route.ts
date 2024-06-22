import  connectMongoDB  from "@/lib/mongoDB";
import { RequestModel } from "@/models/request";
import { NextResponse } from "next/server";



export async function GET() {
    try {
      await connectMongoDB();
      const reqCount = await RequestModel.countDocuments().exec();
      return NextResponse.json({ count: reqCount});
    } catch (error:any) {
        return NextResponse.json({ error: 'Something Wrong Happened:\n'.concat(error.message) },{ status: 500 });
    }
}