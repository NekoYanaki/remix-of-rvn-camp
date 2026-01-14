import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Eye, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  MapPin,
  Tent,
  TreePine
} from "lucide-react";
import { useState } from "react";

export interface Campsite {
  id: number;
  name: string;
  location: string;
  region: string;
  type: string;
  price: number;
  images: string[];
  facilities: string[];
  maxGuests: number;
  rating: number;
  reviewCount: number;
  description: string;
}

interface CampsiteResultCardProps {
  campsite: Campsite;
  totalDays: number;
  onSelect: (campsite: Campsite) => void;
  onViewDetails: (campsite: Campsite) => void;
}

const CampsiteResultCard = ({ 
  campsite, 
  totalDays, 
  onSelect, 
  onViewDetails 
}: CampsiteResultCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === campsite.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? campsite.images.length - 1 : prev - 1
    );
  };

  const totalPrice = campsite.price * (totalDays || 1);

  const displayedFacilities = campsite.facilities.slice(0, 4);
  const remainingFacilities = campsite.facilities.length - 4;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row">
        {/* Image Carousel */}
        <div className="relative w-full lg:w-80 h-56 lg:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={campsite.images[currentImageIndex]}
            alt={campsite.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Image Navigation */}
          {campsite.images.length > 1 && (
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
            {currentImageIndex + 1}/{campsite.images.length}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5">
          <div className="flex flex-col lg:flex-row gap-4 h-full">
            {/* Left - Details */}
            <div className="flex-1 space-y-3">
              {/* Title */}
              <div>
                <h3 className="text-lg font-semibold text-foreground hover:text-primary cursor-pointer transition-colors">
                  {campsite.name}
                </h3>
              </div>

              {/* Location & Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{campsite.location}</span>
                </div>
                <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 rounded text-sm font-medium">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {campsite.rating.toFixed(1)}
                </div>
                <span className="text-sm text-muted-foreground">
                  ({campsite.reviewCount.toLocaleString()} รีวิว)
                </span>
              </div>

              {/* Specs */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>รองรับ {campsite.maxGuests} คน</span>
                </div>
                <div className="flex items-center gap-1">
                  <Tent className="w-4 h-4" />
                  <span>{campsite.type}</span>
                </div>
                <div className="flex items-center gap-1">
                  <TreePine className="w-4 h-4" />
                  <span>{campsite.region}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground line-clamp-2">
                {campsite.description}
              </p>

              {/* Facilities */}
              <div className="flex flex-wrap gap-1.5">
                {displayedFacilities.map((facility) => (
                  <span 
                    key={facility} 
                    className="text-xs bg-muted px-2 py-1 rounded-md text-muted-foreground"
                  >
                    {facility}
                  </span>
                ))}
                {remainingFacilities > 0 && (
                  <span className="text-xs bg-muted px-2 py-1 rounded-md text-primary font-medium">
                    +{remainingFacilities} เพิ่มเติม
                  </span>
                )}
              </div>
            </div>

            {/* Right - Price & Actions */}
            <div className="lg:w-44 flex flex-col items-end justify-between lg:border-l lg:pl-4">
              <div className="text-right w-full">
                <p className="text-2xl font-bold text-primary">
                  ฿{totalPrice.toLocaleString()}
                </p>
                
                <p className="text-xs text-muted-foreground">
                  {totalDays > 1 ? `${totalDays} คืน` : "ต่อคืน"}
                </p>
                
                <p className="text-xs text-muted-foreground mt-1">
                  ราคา/คืน ฿{campsite.price.toLocaleString()}
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full mt-4">
                <Button
                  onClick={() => onSelect(campsite)}
                  className="w-full"
                >
                  จองแคมป์ไซต์นี้
                </Button>
                <Button
                  variant="outline"
                  onClick={() => onViewDetails(campsite)}
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

export default CampsiteResultCard;
