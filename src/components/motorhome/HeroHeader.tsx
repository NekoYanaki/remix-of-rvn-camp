import React from "react";
import { Star, Car } from "lucide-react";

interface HeroHeaderProps {
  vehicleType: string;
  brand: string;
  model: string;
  rating: number;
  reviewCount: number;
}

const HeroHeader = ({
  vehicleType,
  brand,
  model,
  rating,
  reviewCount,
}: HeroHeaderProps) => {
  return (
    <div className="space-y-3">
      {/* Badge - Vehicle Type on top */}
      <div className="flex items-center gap-2">
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          Motorhome
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        {vehicleType}
      </h1>

      {/* Rating and Brand */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 bg-secondary rounded-full px-3 py-1">
          <Car className="h-3.5 w-3.5" />
          <span className="text-sm font-medium">{brand} {model}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-semibold">{rating}</span>
          </div>
          <span className="text-muted-foreground text-sm">
            ({reviewCount} รีวิว)
          </span>
          <span className="text-primary font-medium text-sm hover:underline cursor-pointer">
            อ่านรีวิวทั้งหมด
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroHeader;
