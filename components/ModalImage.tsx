import React from "react";
import Image from "next/image";
import { Media } from "@/app/types/Media";

interface ModalProps {
  selectedImage: Media;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const ModalComponent: React.FC<ModalProps> = ({
  selectedImage,
  onClose,
  onNext,
  onPrev,
}) =>{
  return (

      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-25">
        <div className="max-w-screen-lg w-full    md:w-5/6 md:h-5/6 mx-4">
          <div className="bg-white px-4 pb-4">
            <div className="flex flex-row justify-between text-center items-center py-3">
              <span className="text-lg font-semibold">{selectedImage.alt}</span>
              <button
                type="button"
                className=" bg-gray-600 bg-opacity-50 py-1 px-2.5 hover:bg-gray-400
                  hover:bg-opacity-70 transition-all rounded-full text-xl text-white font-bold"
                onClick={onClose}
              >
                &#10005;
              </button>
            </div>
            <div className="relative">
              <button
                type="button"
                className="absolute z-[60] top-1/2 transform -translate-y-1/2 left-0
               text-white py-4 px-4 md:py-8 md:px-8 text-2xl md:text-5xl outline-none drop-shadow-lg custom-shadow"
                onClick={onPrev}
              >
                &lt;
              </button>

              <button
                type="button"
                className="absolute z-[60] top-1/2 transform -translate-y-1/2 right-0
              text-white py-4 px-4 md:py-8 md:px-8 text-3xl md:text-5xl drop-shadow-lg custom-shadow"
                onClick={onNext}
              >
                &gt;
              </button>
              <div className="relative aspect-video">
              <Image src={selectedImage.src} fill  alt={selectedImage.alt} className="object-contain w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
};