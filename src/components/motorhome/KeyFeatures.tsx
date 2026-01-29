import React, { useState } from "react";
import {
  Wifi,
  Snowflake,
  Tv,
  ShowerHeadIcon,
  Utensils,
  Flame,
  Battery,
  BedDouble,
  Wind,
  Thermometer,
  Droplets,
  UsbIcon,
  Car,
  Check,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface KeyFeaturesProps {
  features: string[];
  maxVisible?: number;
}

// Icon mapping for features
const featureIcons: Record<string, React.ReactNode> = {
  "WiFi": <Wifi className="h-4 w-4" />,
  "Shower": <ShowerHeadIcon className="h-4 w-4" />,
  "Toilet": <Droplets className="h-4 w-4" />,
  "Freezer": <Snowflake className="h-4 w-4" />,
  "Kitchen equipment": <Utensils className="h-4 w-4" />,
  "Fridge": <Snowflake className="h-4 w-4" />,
  "Hot water": <Thermometer className="h-4 w-4" />,
  "GPS": <Car className="h-4 w-4" />,
  "AC in cab": <Wind className="h-4 w-4" />,
  "AC in living area": <Snowflake className="h-4 w-4" />,
  "Bluetooth": <UsbIcon className="h-4 w-4" />,
  "TV": <Tv className="h-4 w-4" />,
  "Floor heating": <Flame className="h-4 w-4" />,
  "Aux-port": <UsbIcon className="h-4 w-4" />,
  "Solar panel": <Battery className="h-4 w-4" />,
  "Adapter to electrical connection": <Battery className="h-4 w-4" />,
  "Mosquito net": <Check className="h-4 w-4" />,
  "Double bed": <BedDouble className="h-4 w-4" />,
};

const getFeatureIcon = (name: string) => {
  return featureIcons[name] || <Check className="h-4 w-4" />;
};

const KeyFeatures = ({ features, maxVisible = 10 }: KeyFeaturesProps) => {
  const [showAll, setShowAll] = useState(false);

  const visibleFeatures = showAll ? features : features.slice(0, maxVisible);
  const remainingCount = features.length - maxVisible;

  return (
    <div className="py-5 border-t">
      <h3 className="font-semibold text-base mb-3">Key Features</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {visibleFeatures.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-2 p-2.5 bg-muted/40 rounded-lg text-sm"
          >
            <span className="text-primary flex-shrink-0">
              {getFeatureIcon(feature)}
            </span>
            <span className="text-foreground/80 truncate">{feature}</span>
          </div>
        ))}
      </div>

      {remainingCount > 0 && !showAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(true)}
          className="mt-3 text-primary hover:text-primary/80"
        >
          <ChevronDown className="h-4 w-4 mr-1" />+{remainingCount} เพิ่มเติม
        </Button>
      )}

      {showAll && features.length > maxVisible && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(false)}
          className="mt-3 text-muted-foreground"
        >
          <ChevronUp className="h-4 w-4 mr-1" />
          แสดงน้อยลง
        </Button>
      )}
    </div>
  );
};

export default KeyFeatures;
