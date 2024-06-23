import {
    generateReactHelpers,
  } from "@uploadthing/react";
  
  import type { OurFileRouter } from "@/app/api/uploadthing/core";
  
export const { uploadFiles, useUploadThing} = generateReactHelpers<OurFileRouter>();
/*   
  import type { OurFileRouter } from "@/app/api/uploadthing/core";
  export UploadFunc = Uploader<OurFileRouter>();
  export const UploadButton = generateUploadButton<OurFileRouter>();
  export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
  import { generateReactHelpers } from "@uploadthing/react";
*/
 