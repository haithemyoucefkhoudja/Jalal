import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();
 
const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
 
export const ourFileRouter = {
    // Example "profile picture upload" route - these can be named whatever you want!
    profilePicture: f(["image"])
      .middleware(({ req }) => auth(req))
      .onUploadComplete((data) => console.log("file", data)),
   
    // This route takes an attached image OR video
    messageAttachment: f(["image", "video"])
      .middleware(({ req }) => auth(req))
      .onUploadComplete((data) => console.log("file", data)),
   
    // Takes exactly ONE image up to 2MB
    strictImageAttachment: f({
      image: { maxFileSize: "4MB", maxFileCount: 8, minFileCount: 1 },
    })
      .middleware(({ req }) => auth(req))
      .onUploadComplete((data) => console.log("file", data))
      ,
   
    // Takes up to 4 2mb images and/or 1 256mb video
    mediaPost: f({
      image: { maxFileSize: "4MB", maxFileCount: 4 },
      video: { maxFileSize: "256MB", maxFileCount: 1 },
    })
      .middleware(({ req }) => auth(req))
      .onUploadComplete((data) => console.log("file", data)),
  } satisfies FileRouter;
   
  export type OurFileRouter = typeof ourFileRouter;