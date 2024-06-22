"use client"; // Make this component a client component
import React, { FormEvent, useEffect, useState } from "react";
import CustomFileSelector from "./CustomFileSelector";
import ImagePreview from "./ImagePreview";
import axios from "axios";
import classNames from "classnames";
import Image from "next/image";
import { uploadFiles } from "@/utils/uploadthing";
import { IProgress } from "./progress";
import { Media } from "@/app/types/Media";

const FileUploadForm = () => {
  const [images, setImages] = useState<File[]>([]);
  const [ImeagesState ,  setImagesState] = useState<IProgress[]>([]);
  const [uploading, setUploading] = useState(false);
  const [srcImages, setSrcImages] = useState<Media[]>([]);
  const [error, setError] = useState<null | string>(null);
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      
      setImages(prev => {
        const newFiles = _files.filter(file => 
          !prev.some(prevFile => prevFile.name === file.name && prevFile.size === file.size)
        );
        return([...prev, ...newFiles])});
      
      
    }
  };
  useEffect(()=>{
    
    const initialProgress = images.map(file => ({
      filename: file.name,
      progress: 0,
    }));
    setSrcImages(images.map(ele=>
      {
        return(
      {src:URL.createObjectURL(ele),
      alt:ele.name
        }
      )
      }
    ))

    setImagesState(initialProgress)
  },[images])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try{setUploading(true);
      setError(null);
    e.preventDefault();

    const formData = new FormData();
    images.forEach((image, i) => {
      formData.append(image.name, image);
    });
  
    const endpoint = 'strictImageAttachment';
    const res = await uploadFiles(endpoint, {
      files: images,
      onUploadBegin: ({ file }) => {
      },
      
      onUploadProgress: ({ file, progress }) => {
        console.log(`Upload progress for file ${file}: ${progress}%`);
        setImagesState(prev =>
          prev.map(p =>
            p.filename === file
              ? { ...p, progress: progress }
              : p
          )
        );
      },
      
      skipPolling: false,
      headers: {
        'Authorization': 'Bearer your-token-here', // Replace with your actual authorization token if needed
      },
    });
  }
  catch(error:any){
    setError(error.message);
  }
  finally {
    setUploading(false);
  }
  };
  return (
    <React.Fragment>
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex justify-between">
        <CustomFileSelector
          accept="image/png, image/jpeg"
          onChange={handleFileSelected}
        />
        <button
          type="submit"
          className={classNames({
            "bg-violet-50 text-violet-500 hover:bg-violet-100 px-4 py-2 rounded-md  ":
              true,
            "disabled pointer-events-none opacity-40": uploading,
          })}
          disabled={uploading}
        >
          {uploading ? 
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-indigo-400"
            role="status">
            <span
              className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
              >Loading...
            </span>
         </div>: 'Upload'}
          
        </button>
      </div>
      <ImagePreview error={error !== null} imageStates={ImeagesState} images={srcImages} deleteImage={function (index: number): void {
        
        setImages(prev=> prev.filter(
          (_, i) =>(i !== index)
        ))
      } } />
    </form>
    </React.Fragment>
  );
};

export default FileUploadForm;
