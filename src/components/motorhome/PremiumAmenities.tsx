import React, { useState } from "react";
import {
  Wifi,
  Snowflake,
  Tv,
  ShowerHead,
  Utensils,
  Flame,
  Battery,
  Wind,
  Thermometer,
  Droplets,
  Car,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Amenity {
  name: string;
  available: boolean;
}

interface PremiumAmenitiesProps {
  amenities: Amenity[];
  maxVisible?: number;
}

const amenityIcons: Record<string, React.ReactNode> = {
  "WiFi": <Wifi className="h-5 w-5" />,
  "Shower": <ShowerHead className="h-5 w-5" />,
  "Toilet": <Droplets className="h-5 w-5" />,
  "Freezer": <Snowflake className="h-5 w-5" />,
  "Kitchen equipment": <Utensils className="h-5 w-5" />,
  "Fridge": <Snowflake className="h-5 w-5" />,
  "Hot water": <Thermometer className="h-5 w-5" />,
  "GPS": <Car className="h-5 w-5" />,
  "AC in cab": <Wind className="h-5 w-5" />,
  "AC in living area": <Snowflake className="h-5 w-5" />,
  "TV": <Tv className="h-5 w-5" />,
  "Floor heating": <Flame className="h-5 w-5" />,
  "Solar panel": <Battery className="h-5 w-5" />,
};

const getIcon = (name: string) => amenityIcons[name] || <Check className="h-5 w-5" />;

const PremiumAmenities = ({ amenities, maxVisible = 6 }: PremiumAmenitiesProps) => {
  const [showAll, setShowAll] = useState(false);
  
  const availableAmenities = amenities.filter((a) => a.available);
  const visibleAmenities = availableAmenities.slice(0, maxVisible);
  const remainingCount = availableAmenities.length - maxVisible;

  return (
    <div className="space-y-4">
      {/* Amenities Grid - Clean, minimal */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {visibleAmenities.map((amenity) => (
          <div
            key={amenity.name}
            className="flex items-center gap-3 py-2"
          >
            <span className="text-primary/80">{getIcon(amenity.name)}</span>
            <span className="text-foreground/80 text-sm">{amenity.name}</span>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {remainingCount > 0 && (
        <Button
          variant="ghost"
          onClick={() => setShowAll(true)}
          className="text-primary hover:text-primary/80 hover:bg-transparent p-0 h-auto font-normal"
        >
          ดูสิ่งอำนวยความสะดวกทั้งหมด ({availableAmenities.length})
        </Button>
      )}

      {/* All Amenities Modal */}
      <Dialog open={showAll} onOpenChange={setShowAll}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">สิ่งอำนวยความสะดวก</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 pt-4">
            {availableAmenities.map((amenity) => (
              <div
                key={amenity.name}
                className="flex items-center gap-3 py-2"
              >
                <span className="text-primary/80">{getIcon(amenity.name)}</span>
                <span className="text-foreground/80 text-sm">{amenity.name}</span>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PremiumAmenities;
