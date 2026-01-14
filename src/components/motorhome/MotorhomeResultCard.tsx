import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Eye, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Fuel,
  Settings,
  Bed
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface Motorhome {
  id: number;
  name: string;
  brand: string;
  model: string;
  seats: number;
  price: number;
  originalPrice?: number;
  images: string[];
  amenities: string[];
  bedSize: string;
  transmission: string;
  fuelType: string;
  rating: number;
  reviewCount: number;
  pickupLocation: string;
  dropoffLocation: string;
}

interface MotorhomeResultCardProps {
  motorhome: Motorhome;
  totalDays: number;
  onSelect: (motorhome: Motorhome) => void;
  onViewDetails: (motorhome: Motorhome) => void;
}

const MotorhomeResultCard = ({ 
  motorhome, 
  totalDays, 
  onSelect, 
  onViewDetails 
}: MotorhomeResultCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === motorhome.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? motorhome.images.length - 1 : prev - 1
    );
  };

  const totalPrice = motorhome.price * (totalDays || 1);
  const originalTotalPrice = motorhome.originalPrice 
    ? motorhome.originalPrice * (totalDays || 1) 
    : null;
  const discountPercent = motorhome.originalPrice 
    ? Math.round((1 - motorhome.price / motorhome.originalPrice) * 100)
    : null;

  const displayedAmenities = motorhome.amenities.slice(0, 4);
  const remainingAmenities = motorhome.amenities.length - 4;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row">
        {/* Image Carousel */}
        <div className="relative w-full lg:w-80 h-56 lg:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={motorhome.images[currentImageIndex]}
            alt={motorhome.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Image Navigation */}
          {motorhome.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {currentImageIndex + 1}/{motorhome.images.length}
          </div>

          {/* Favorite Button */}
          <button
            onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
            className="absolute top-3 right-3 w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-md transition-colors"
          >
            <Heart 
              className={cn(
                "w-5 h-5 transition-colors",
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"
              )} 
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex flex-col lg:flex-row gap-4 h-full">
            {/* Left - Details */}
            <div className="flex-1 space-y-3">
              {/* Title & Brand */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs font-normal">
                    {motorhome.brand}
                  </Badge>
                  <Badge variant="outline" className="text-xs font-normal text-green-600 border-green-300">
                    ว่าง
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                  {motorhome.name}
                </h3>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 rounded text-sm font-medium">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {motorhome.rating.toFixed(1)}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({motorhome.reviewCount.toLocaleString()} รีวิว)
                </span>
              </div>

              {/* Specs */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{motorhome.seats} ที่นั่ง</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bed className="w-4 h-4" />
                  <span>{motorhome.bedSize}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Settings className="w-4 h-4" />
                  <span>{motorhome.transmission}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  <span>{motorhome.fuelType}</span>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-1.5">
                {displayedAmenities.map((amenity) => (
                  <span 
                    key={amenity} 
                    className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
                  >
                    {amenity}
                  </span>
                ))}
                {remainingAmenities > 0 && (
                  <span className="text-xs bg-muted px-2 py-1 rounded-md text-primary font-medium">
                    +{remainingAmenities} เพิ่มเติม
                  </span>
                )}
              </div>
            </div>

            {/* Right - Price & Actions */}
            <div className="lg:w-44 flex flex-col items-end justify-between lg:border-l lg:pl-4">
              <div className="text-right w-full">
                {discountPercent && (
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs">
                      ลด {discountPercent}%
                    </Badge>
                  </div>
                )}
                
                {originalTotalPrice && (
                  <p className="text-sm text-muted-foreground line-through">
                    ฿{originalTotalPrice.toLocaleString()}
                  </p>
                )}
                
                <p className="text-2xl font-bold text-primary">
                  ฿{totalPrice.toLocaleString()}
                </p>
                
                <p className="text-xs text-muted-foreground">
                  {totalDays > 1 ? `${totalDays} คืน` : "ต่อคืน"}
                </p>
                
                <p className="text-xs text-muted-foreground mt-1">
                  ราคา/คืน ฿{motorhome.price.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full mt-4">
                <Button
                  onClick={() => onSelect(motorhome)}
                  className="w-full"
                >
                  เลือกรถคันนี้
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onViewDetails(motorhome)}
                  className="w-full gap-1"
                >
                  <Eye className="w-4 h-4" />
                  ดูรายละเอียด
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MotorhomeResultCard;
