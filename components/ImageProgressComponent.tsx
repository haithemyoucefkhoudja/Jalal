import { useEffect, useState } from "react";
import { IProgress } from "./progress";
import React from "react";
import { EyeIcon } from "lucide-react";
import { Media } from "@/app/types/Media";

export const ImageProgressComponent = ({onView, src, alt}:{ onView: (image: Media) => void; src: string;
    alt: string;}) =>{
  return(
    <React.Fragment>
    <div className="absolute inset-0 flex justify-center items-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
        <button
          className="flex justify-center items-center rounded-md h-8 w-8 text-gray-300 disabled:pointer-events-none disabled:opacity-50 custom-shadow"
          onClick={() => onView({ src, alt })}
          type="button"
        >
          <EyeIcon className="w-6 h-6" />
        </button>
    </div>
    </React.Fragment>
  )
}