
import React from "react";
import { Grid3x3 } from "lucide-react";

interface ImageGridProps {
  images: string[];
  name: string;
  onImageClick: (index: number) => void;
}

export const ImageGrid = ({ images, name, onImageClick }: ImageGridProps) => {
  // Take only first 5 images
  const displayImages = images.slice(0, 5);
  
  return (
    <div className="grid grid-cols-3 gap-2 h-[400px] rounded-xl overflow-hidden mb-8">
      {/* Main large image - takes 2/3 width */}
      <div className="col-span-2 row-span-2 relative group cursor-pointer">
        <img
          src={displayImages[0]}
          alt={name}
          className="w-full h-full object-cover group-hover:brightness-95 transition-all duration-300"
          onClick={() => onImageClick(0)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      </div>

      {/* Right column - 4 smaller images in 2x2 grid */}
      <div className="col-span-1 row-span-2 grid grid-rows-2 grid-cols-2 gap-2">
        {displayImages.slice(1, 5).map((image, index) => (
          <div key={index} className="relative group cursor-pointer">
            <img
              src={image}
              alt={`${name} ${index + 2}`}
              className="w-full h-full object-cover group-hover:brightness-95 transition-all duration-300"
              onClick={() => onImageClick(index + 1)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            {index === 3 && images.length > 5 && (
              <div 
                className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition-all"
                onClick={() => onImageClick(index + 1)}
              >
                <div className="text-white text-center">
                  <Grid3x3 className="h-5 w-5 mx-auto mb-1" />
                  <span className="text-xs font-medium">
                    +{images.length - 5} photos
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
