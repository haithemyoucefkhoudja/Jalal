import React, { memo, useEffect, useState } from "react";
import Image from "next/image";
import { ModalComponent } from "./ModalImage";
import { Media } from "@/app/types/Media";
import { EyeIcon, LucideAlertCircle, LucideBookCheck, LucideFolderDown, Trash2, X } from "lucide-react";
import { IProgress } from "./progress";
import { ImageProgressComponent } from "./ImageProgressComponent";

type Props = {
  images: Media[];
  deleteImage: (index: number) => void;
  imageStates:IProgress[];
  error:boolean
};

const ImagePreview = ({ images, deleteImage,imageStates, error }: Props) => {
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
      <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-8  max-h-96 overflow-y-auto gap-2 my-2">
        
        {images.map((image, index) => {
          
          return (
            <ImageCard
              error={error}
              key={index}
              src={image.src}
              alt={image.alt}
              index={index}
              deleteImage={()=>deleteImage(index)}
              ImageProgress={imageStates[index]}
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
  ImageProgress:IProgress;
  error:boolean;
};

const ImageCard = memo(({ src, alt, index, deleteImage, onView, ImageProgress,error }:ImageCardProps) => {
 return( 
  <section className="w-full" key={index}>
  <div className=" inline-flex space-x-1.5 items-center  w-full">
    {/*<input
      type="checkbox"
      checked={selected}
      onChange={() => onSelect(index)}
      className="h-4 w-4"
    />*/}
    <button
      className="flex justify-center items-center rounded-md h-8 w-8 text-gray-500 hover:text-gray-900  disabled:pointer-events-none disabled:opacity-50 drop-shadow-lg"
      onClick={() => deleteImage()}
      type="button"
    >
    <X className="w-6 h-6 "></X>
  </button>
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
    <ImageProgressComponent src={src} alt={alt} onView={onView} ImageProgress={ImageProgress}></ImageProgressComponent>
      
  </div>
  
  {ImageProgress &&   ImageProgress.progress == 100 ? (<div className=" inline-flex justify-center items-center h-10 w-full"><LucideFolderDown color="green"></LucideFolderDown></div>):
  
  error ?  (<div className=" inline-flex justify-center items-center h-10 w-full"><LucideAlertCircle color="red"></LucideAlertCircle></div>)
  :
  (
    <div className=" inline-flex justify-center items-center h-10 w-full">{ImageProgress.progress == 0 ? '': Math.ceil(ImageProgress.progress) + '%'}</div>
  )}
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
export default ImagePreview;
