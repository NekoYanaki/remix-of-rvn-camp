import React from "react";
import { Star } from "lucide-react";

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
    <div className="space-y-5">
      {/* Brand Pill - Soft, minimal */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted/40 rounded-full text-xs font-medium text-muted-foreground tracking-wide uppercase">
        {brand} {model}
      </div>

      {/* Title - Large, confident */}
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground tracking-tight leading-tight">
        {vehicleType}
      </h1>

      {/* Rating - Subtle, understated */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Star className="h-4 w-4 fill-muted-foreground/60 text-muted-foreground/60" />
          <span className="font-medium text-foreground/70">{rating}</span>
        </div>
        <span className="text-muted-foreground/50">•</span>
        <span>{reviewCount} รีวิว</span>
      </div>
    </div>
  );
};

export default HeroHeader;
