'use client';
import { FileInfo } from "@/types/Media";
import React, {  useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { ContactFormSchema, TimeFormSchema } from '@/schemas/Contact';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LucideAlertCircle, LucideCircleCheck, LucideRepeat } from 'lucide-react';
import 'react-datepicker/dist/react-datepicker.css';

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
 
import { useUploadThing } from "@/utils/uploadthing";
import { useCallback,  } from "react";
import { Media } from '@/app/types/Media';
import Gallery from '../Gallery';
import createRequest from '@/actions/createRequest';
import { IRequest } from '@/models/request';
import DatePicker from 'react-datepicker';
import { Button } from '../ui/button';
import createMeeting from "@/actions/createMeeting";
import { IMeeting } from "@/models/meeting";
 

        {/*<button
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
          
        </button>*/}
{/*const FileSelector = () =>{
    const [images, setImages] = useState<File[]>([]);
  const [ImeagesState ,  setImagesState] = useState<IProgress[]>([]);
  const [uploading, setUploading] = useState(false);
  const [srcImages, setSrcImages] = useState<Media[]>([]);
  const [error, setError] = useState<null | string>(null);
  const handleFileSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //convert `FileList` to `File[]`
      const _files = Array.from(e.target.files);
      if(_files.length <= 8)
      setImages(prev => {
        const newFiles = _files.filter(file => 
          !prev.some(prevFile => prevFile.name === file.name && prevFile.size === file.size)
        );
        if([...prev, ...newFiles].length > 8)
          return prev
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
    return(
        <section className='sm:col-span-2'>
        <div className="flex justify-between">
        <CustomFileSelector
          accept="image/png, image/jpeg"
          onChange={handleFileSelected}
        />
      </div>
      <ImagePreview error={error !== null} imageStates={ImeagesState} images={srcImages} deleteImage={function (index: number): void {
        
        setImages(prev=> prev.filter(
          (_, i) =>(i !== index)
        ))
      } } />
      </section>
    )
}*/}
const ContactUs = () => {
    
 
    const {
        setError,
        register,
        handleSubmit,
        clearErrors,
        getValues,
        formState: { isSubmitting,errors },
      }  = useForm<z.infer<typeof ContactFormSchema>>({
      resolver: zodResolver(ContactFormSchema),
      defaultValues: {
      },
    });
    const [files, setFiles] = useState<File[]>([]);
    const [FilesInfo, setFilesInfo] = useState<FileInfo[] | null>(null)
    const [Progress, setProgress] = useState<null | number>(null);
    const [Completed, setCompleted] = useState(false);
    const [srcImages, setSrcImages] = useState<Media[]>([]);
    const [uploading, setUploading] = useState(false);
    const [step, setStep] = useState(1);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if(acceptedFiles.length <= 8)
        setFiles(prev => {
          const newFiles = acceptedFiles.filter(file => 
            !prev.some(prevFile => prevFile.name === file.name && prevFile.size === file.size)
          );
          if([...prev, ...newFiles].length > 8)
            return prev
          return([...prev, ...newFiles])});      
  }, []);
 
  const fileTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/bmp',
    'image/webp',
    'image/tiff',
    'image/svg+xml'
  ];
  
  useEffect(()=>{
    
    setSrcImages(files.map(ele=>
      {
        return(
      {src:URL.createObjectURL(ele),
      alt:ele.name
        }
      )
      }
    ))

  },[files])
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });
  const { startUpload, } = useUploadThing(
    "strictImageAttachment",
    {
        onUploadBegin:()=>{
            setUploading(true);
            clearErrors('root')
        },
        onUploadProgress: (p)=>{
            setProgress(p)
        },
      onClientUploadComplete: async (res) => {
        
        const FileInfos:FileInfo[] = res.map(ele=>{
          return {
            customId:ele.customId,
            key:ele.key,
            name:ele.name,
            serverData:ele.serverData,
            size:ele.size,
            url:ele.url,
            type:ele.type

          }
        })
        const s_res = await createRequest({
          ...getValues(),
          media: FileInfos
        }as unknown as IRequest)
        if(!s_res.success) {
            setError('root',{message:'Something went wrong'.concat(s_res.error)})
            return;
        }
        setCompleted(true);
        setProgress(null);
        setUploading(false);
        setFilesInfo(res)
      },
      onUploadError: (e) => {
        setError('root', {message:'Something went wrong:'.concat(e.message)} )
      },
    },
  );
    const onSubmit = async (values: z.infer<typeof ContactFormSchema>) => {
        setStep(2)
      };
    return (
        <div id="Form" className="overflow-hidden bg-white py-16 px-4  sm:px-6 lg:px-8 lg:py-24">
            <div className="relative mx-auto max-w-xl">
                <svg className="absolute left-full translate-x-1/2 transform" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" className="text-green-200 " fill="currentColor"></rect>
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"></rect>
                </svg>
                <svg className="absolute right-full bottom-0 -translate-x-1/2 transform" width="404" height="404" fill="none" viewBox="0 0 404 404" aria-hidden="true">
                    <defs>
                        <pattern id="85737c0e-0916-41d7-917f-596dc7edfa27" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect x="0" y="0" width="4" height="4" className="text-gray-200 " fill="currentColor"></rect>
                        </pattern>
                    </defs>
                    <rect width="404" height="404" fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"></rect>
                </svg>
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold tracking-tight text-green-400  sm:text-4xl">Contact Us</h2>
                    <p className="mt-4 text-lg leading-6 text-gray-500 ">Please use the form below to contact us. Thank you!</p>
                </div>
                <div className="mt-12">
                    {step == 1 && <form className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8" onSubmit={handleSubmit(onSubmit)}>
                        <div className="sm:col-span-2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 ">Name</label>
                            <div className="mt-1">
                                <input {...register("name")} name="name" type="text" id="name" autoComplete="organization"  className="border-b border-teal-500 block w-full py-3 px-4 shadow-sm focus:outline-none " placeholder='Jhon Doe' aria-label='Name'/>
                            </div>
                            {errors.name && (
                                <div className="text-red-500">{errors.name.message}</div>
                            )}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 ">Email</label>
                            <div className="mt-1">
                                <input {...register("email")} id="email"  type="email" autoComplete="email" className="border-b border-teal-500 block w-full py-3 px-4 shadow-sm focus:outline-none"placeholder='JhonDoe@gmail.com' aria-label='Email' />
                            </div>
                            {errors.email && (
                                <div className="text-red-500">{errors.email.message}</div>
                            )}
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="descreption" className="block text-sm font-medium text-gray-700 ">Descreption</label>
                            <div className="mt-1">
                                <textarea {...register("descreption")}   rows={5} className="border border-teal-300 block w-full rounded-md py-3 px-4 shadow-sm focus:outline-none"></textarea>
                            </div>
                            {errors.descreption && (
                                <div className="text-red-500">{errors.descreption.message}</div>
                            )}
                        </div>
                        
                        <div className='flex flex-col w-full  sm:col-span-2'>
                        {errors.root &&
                        <div className=" flex items-center space-x-4 self-start">
                            <LucideAlertCircle  color="red"/>
                            <p className="text-sm font-medium text-red-500">
                            {errors.root.message}
                            </p>
                        </div>
                        }
                        <div className="flex justify-end sm:col-span-2 self-end ">
                            <button disabled={isSubmitting} type="submit" className="inline-flex items-center rounded-md px-4 py-2 font-medium focus:outline-none focus-visible:ring focus-visible:ring-teal-500 shadow-sm sm:text-sm transition-colors duration-75 text-teal-500 border bg-white hover:bg-teal-50 active:bg-teal-100 disabled:bg-teal-100  disabled:cursor-not-allowed">
                                {
                                    !isSubmitting? <span>Next</span>:      <div className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit]"/>

                                
                                }
                            </button>
                        </div>
                        </div>
                    </form>}
                    {step == 2 && <ChoicePanel onChoose={(choice)=>{
                        if(choice == 'upload')
                            setStep(3)
                        if(choice == 'schedule')
                            setStep(4)
                    }}/>}
                    {step == 3 &&
                        <section className=' min-h-[500px]'>
                        {Completed || uploading || errors.root || Progress ? (<></>) 
                            :
                            <section className='flex flex-col'>
                            <div
                                {...getRootProps()}
                                className="flex flex-col items-center justify-center w-full mdLh-64 h-32 p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 "
                            >
                                <input {...getInputProps()} disabled={uploading || Completed}  className="bg-red-500"/>
                                <p className="mt-2 text-gray-500 ">Drop Images here!</p>
                            </div>
                            <div className="flex flex-col items-center">
                                {files.length > 0 && (
                                    <button
                                    type="button"
                                    onClick={() => startUpload(files)}
                                    className="px-4 py-2 mt-4 text-white bg-green-400 rounded-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    >
                                    Upload {files.length} files
                                    </button>
                                )}
                            </div> 
                            </section>}

                            {(Progress !== null || Progress==0) && !errors.root &&
                            <div className='flex flex-col w-full justify-center items-center py-4  drop-shadow-sm '> 
                                <ProgressCircle completed={Completed} progress={Progress}></ProgressCircle>
                            </div>}
                            {/*Completed  && !errors.root &&*/}
                            { 
                            Completed && !errors.root &&
                                <div className='flex flex-col w-full justify-center items-center py-4  drop-shadow-sm '>
                                <LucideCircleCheck className=' h-20 w-20 text-green-400' ></LucideCircleCheck>
                                <p className="mt-4 text-lg  text-gray-500 font-bold ">Success, we&apos;ll contact you soon</p>
                                </div>
                            }

                            { errors.root &&
                            <div className='flex flex-col w-full justify-center items-center py-4  sm:col-span-2 my-8'>
                                
                                <div className=" flex items-center space-x-4 ">
                                    <LucideAlertCircle  color="red"/>
                                    <p className="text-lg font-medium text-red-500">
                                    {errors.root.message}
                                    </p>
                                </div>
                                
                                { (
                                    <button
                                    type="button"
                                    onClick={() => startUpload(files)}
                                    className="px-4 py-2 mt-4 w-fit flex space-x-1.5 text-white bg-green-400 rounded-md hover:bg-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                                    >
                                    retry <LucideRepeat className='w-6 h-6' color='white'></LucideRepeat>
                                    </button>
                                )}
                            </div>
                            }
                            <div className='sm:col-span-2'>
                                <Gallery uploading={uploading} completed={Completed}  images={srcImages} deleteImage={function (index: number): void {
                                    if(!Completed || uploading)
                                    setFiles(prev=> prev.filter(
                                    (_, i) =>(i !== index)
                                    ))
                                } } />
                            </div>
                            
                            </section>
                        }
                        {step == 4 &&
                        
                        <section className=' min-h-[500px]'>
                          <div className='sm:col-span-2'>
                            <ScheduleMeeting {...getValues()} />
                          </div>
                        </section>
                        }
                </div>
            </div>
        </div>
    );
};
interface ScheduleMeetingProps {
  name:string;
  email:string;
  descreption:string;
}

const ScheduleMeeting: React.FC<ScheduleMeetingProps> = ({  email, name, descreption }) => {
  const {
    setError,
    register,
    handleSubmit,
    clearErrors,
    formState: { isSubmitting,errors },
  }  = useForm<z.infer<typeof TimeFormSchema>>({
  resolver: zodResolver(TimeFormSchema),
  defaultValues: {
  },
});
  const [Iscompleted, setCompleted ] = useState(false);
  const onSubmit = async (values: z.infer<typeof TimeFormSchema>) => {
    const s_res = await createMeeting({
      email,
      name,
      descreption,
      appointment:values.appointment
    }as unknown as IMeeting);
    clearErrors('appointment');
    if(!s_res.success) {
        setError('root',{message:'Something went wrong'.concat(s_res.error)})
        return;
    } 
    setCompleted(true)
  };
  return (
<>
{!Iscompleted?
      <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-bold">Schedule a Meeting</h2>
      <form className="flex space-x-3" onSubmit={handleSubmit(onSubmit)}>
      <input

      {...register("appointment",)}
      type="datetime-local"        
        className="border rounded p-2 "
      />
      <Button disabled={isSubmitting}  type="submit" className="mt-4 bg-green-400 hover:bg-green-400/90">
      {!isSubmitting? <span>Schedule Meeting</span>:      <div className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit]"/>}
      </Button>
      </form>
      
      {errors.appointment && (
        <div className="text-red-500">{errors.appointment.message}</div>
      )}    
      {errors.root && (
        <div className="text-red-500">{errors.root.message}</div>
      )}    
    </div>
      :(  
            <div className='flex flex-col w-full justify-center items-center py-4  drop-shadow-sm '>
            <LucideCircleCheck className=' h-20 w-20 text-green-400' ></LucideCircleCheck>
            <p className="mt-4 text-lg  text-gray-500 font-bold ">Success, we&apos;ll contact you soon</p>
            </div>
        )}
    
</>    
  );

};
const ProgressCircle = ({ progress }:{progress:number, completed:boolean}) => {
    const strokeDasharray = 283; // 2 * Math.PI * 45 (circle circumference)
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="absolute" width="100" height="100" viewBox="0 0 100 100">
        <circle
          className="text-gray-300"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <circle
          className="text-blue-500"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          style={{
            strokeDasharray,
            strokeDashoffset,
          }}
        />
      </svg>
      <span className="text-xl font-semibold text-gray-700 dark:text-gray-300">{progress}%</span>
    </div>
  );
  };
  const ChoicePanel = ({ onChoose }:{onChoose:(choice:string)=>void}) => {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg shadow-md min-h-[500px]">
        <h2 className="text-2xl font-bold text-green-300 mb-6">What would you like to do next?</h2>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => onChoose('schedule')}
            className="px-6 py-3 text-lg font-semibold text-white bg-green-400 rounded-md hover:bg-green-400/90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Schedule Meeting
          </button>
          <button
            onClick={() => onChoose('upload')}
            className="px-6 py-3 text-lg font-semibold text-white bg-green-400 rounded-md hover:bg-green-400/90 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Send Images
          </button>
        </div>
      </div>
    );
  };
export default ContactUs;
