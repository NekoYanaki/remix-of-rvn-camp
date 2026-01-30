import React from "react";
import { Star, Car } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-foreground">
        {vehicleType}
      </h1>

      {/* Badges Row */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="flex items-center gap-1 px-2.5 py-1">
          <Car className="h-3.5 w-3.5" />
          {brand} {model}
        </Badge>
        
        <Badge variant="outline" className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border-amber-200 text-amber-700">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold">{rating}</span>
          <span className="text-muted-foreground">({reviewCount} รีวิว)</span>
        </Badge>
      </div>

    </div>
  );
};

export default HeroHeader;
