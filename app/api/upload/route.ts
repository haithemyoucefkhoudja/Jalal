
import { RequestModel } from "@/models/request";
import fs from "fs";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  const formData = await req.formData();
  const formDataEntryValues = Array.from(formData.values());
  
  // Create a new fake request
  {/*const newRequest = await prisma.request.create({
    data: {
      name: 'Fake Request',
      email: 'fake@example.com',
      description: 'This is a fake request for testing purposes.',
    },
  });*/}
  const base64ImageArray = []
  for (const formDataEntryValue of formDataEntryValues) {
    if (typeof formDataEntryValue === 'object' && 'arrayBuffer' in formDataEntryValue) {
      const file = formDataEntryValue as unknown as Blob;
      const buffer = Buffer.from(await file.arrayBuffer());
      //const fileName = `${uuidv4()}.png`; // Generate a unique file name with a UUID
      const base64Image = Buffer.from(buffer as any, 'binary').toString('base64');
      base64ImageArray.push({
        data: base64Image,
        type: file.type,
      });
      // Save the file to the media directory
      /*fs.writeFileSync(`public/${fileName}`, buffer);

      // Create a media entry in the database
      await prisma.media.create({
        data: {
          requestId: newRequest.id,
          url: `/${fileName}`,
          type: file.type,
        },
      });*/
    }
  }
  try{
    console.log('done treating')
  const request = new RequestModel({
    name: 'John Doe',
    email: 'john.doe@example.com',
    description: 'Sample description',
    status: 'PENDING',
    media: base64ImageArray,
  });
  await request.save();
  
  return NextResponse.json({ success: true});
  }
  catch(error:any)
  {
    
  return NextResponse.json({ success:false, error: 'Something went wrong:\n'.concat(error.message) },
  {status:500}
);
  }

}
