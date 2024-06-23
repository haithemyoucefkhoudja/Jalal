import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import { ModalComponent } from "./ModalImage";
import { Media } from "@/app/types/Media";
import { EyeIcon, LucideAlertCircle, LucideBookCheck, LucideFolderDown, X } from "lucide-react";
import { IProgress } from "./progress";
import { ImageProgressComponent } from "./ImageProgressComponent";

type Props = {
  images: Media[];
  deleteImage: (index: number) => void;
  uploading:boolean;
  completed:boolean
};

const Gallery = ({ images, deleteImage,  uploading ,completed}: Props) => {
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const handleNext = () => {
    const nextIndex =
      selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex =
      selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedImage(images[prevIndex]);
    setSelectedIndex(prevIndex);
  };
  const openModal = (image: Media) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  
 

  
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:max-w-full w-full  max-h-96 overflow-y-auto gap-2 my-2">
        
        {images.map((image, index) => {
          
          return (
            <ImageCard
              completed={completed}
              uploading={uploading}
              key={index}
              src={image.src}
              alt={image.alt}
              index={index}
              deleteImage={()=>deleteImage(index)}
              onView={openModal}
            />)
        })}
      </div>
      {/*<button disabled={selectedImages.length == 0}  type="button" className="flex justify-center space-x-1.5 items-center rounded-md h-8  bg-red-500 hover:bg-red-500/80  disabled:pointer-events-none disabled:opacity-50 p-4" onClick={deleteSelectedImages}>
        <span className="font-bold text-white">
          Delete
        </span>
        <Trash2 className="w-6 h-6" color="white"/>

      </button>*/}
      {selectedImage && (
        <ModalComponent
          selectedImage={selectedImage}
          onClose={closeModal}
          onNext={handleNext}
          onPrev={handlePrev}
          
        />
      )}
    </div>
  );
};
type ImageCardProps = {
  src: string;
  alt: string;
  index: number;
  deleteImage: () => void;
  onView: (image: Media) => void;
  uploading:boolean;
  completed:boolean;
};

const ImageCard = memo(({ src, alt, index, deleteImage, onView, uploading, completed }:ImageCardProps) => {
 return( 
  <section className="w-full" key={index}>
  <div className=" inline-flex space-x-1.5 items-center  w-full">
    {/*<input
      type="checkbox"
      checked={selected}
      onChange={() => onSelect(index)}
      className="h-4 w-4"
    />*/}
    {!uploading && !completed &&
    <button
      className="flex justify-center items-center rounded-md h-8 w-8 text-gray-500 hover:text-gray-900  disabled:pointer-events-none disabled:opacity-50 drop-shadow-lg"
      onClick={() => deleteImage()}
      type="button"
    >
    <X className="w-6 h-6 "></X>
  </button>}
    {/*<button
      className="flex justify-center items-center rounded-md h-8 w-8 text-gray-500 hover:text-gray-900  disabled:pointer-events-none disabled:opacity-50 drop-shadow-lg"
      onClick={() => onView({src, alt} )}
      type="button"
    >
    <EyeIcon className="w-6 h-6 "></EyeIcon>
  </button>*/}
  
  </div>
  <div className="relative  group aspect-video flex">
      <CustomImage
        src={src}
        alt={alt}
      />
    <ImageProgressComponent src={src} alt={alt} onView={onView}></ImageProgressComponent>
      
  </div>
  
</section>)
});
ImageCard.displayName = 'imageCard';
const CustomImage = memo(({src, alt}:{src:string, alt:string})=>{
return <Image
src={src}
alt={alt}
className="object-contain transition duration-300 ease-in-out group-hover:blur-sm"
fill
loading="eager"
/>
})
CustomImage.displayName = 'Custom Image';
export default Gallery;
