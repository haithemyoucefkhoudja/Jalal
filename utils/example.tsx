// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function
import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
 
import { useUploadThing } from "@/utils/uploadthing";
import { useCallback, useState } from "react";
 
export function MultiUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);
 
  const { startUpload, } = useUploadThing(
    "strictImageAttachment",
    {
        onUploadProgress: (p)=>{
            console.log('progress:', p)
        },
      onClientUploadComplete: (res) => {
        console.log(res)
      },
      onUploadError: (e) => {
        console.log(e.message)
      },
      onUploadBegin: (fileName) => {
        
        console.log(fileName)
      },
    },
  );
 
  const fileTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/tiff',
    'image/svg+xml'
  ];
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });
 
  return (
    <section>
    <div
    {...getRootProps()}
    className="flex flex-col items-center justify-center w-full h-64 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
  >
    <input {...getInputProps()}  className="bg-red-500"/>
    <p className="mt-2 text-gray-500 ">Drop Images here!</p>
  </div>
        <div className="flex flex-col items-center">
            {files.length > 0 && (
                <button
                type="button"
                onClick={() => startUpload(files)}
                className="px-4 py-2 mt-4 text-green-400 bg-green-200 rounded-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                >
                Upload {files.length} files
                </button>
            )}
        </div>  
    </section>
  );
}