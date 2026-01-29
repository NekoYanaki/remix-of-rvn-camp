import React from "react";
import {
  Wifi,
  Snowflake,
  Tv,
  ShowerHead,
  Utensils,
  Flame,
  Battery,
  BedDouble,
  Refrigerator,
  Wind,
  Thermometer,
  Droplets,
  UsbIcon,
  Car,
  Check
} from "lucide-react";

interface KeyFeaturesProps {
  features: string[];
}

// Icon mapping for features
const featureIcons: Record<string, React.ReactNode> = {
  "WiFi": <Wifi className="h-5 w-5" />,
  "Shower": <ShowerHead className="h-5 w-5" />,
  "Toilet": <Droplets className="h-5 w-5" />,
  "Freezer": <Snowflake className="h-5 w-5" />,
  "Kitchen equipment": <Utensils className="h-5 w-5" />,
  "Fridge": <Refrigerator className="h-5 w-5" />,
  "Hot water": <Thermometer className="h-5 w-5" />,
  "GPS": <Car className="h-5 w-5" />,
  "AC in cab": <Wind className="h-5 w-5" />,
  "AC in living area": <Snowflake className="h-5 w-5" />,
  "Bluetooth": <UsbIcon className="h-5 w-5" />,
  "TV": <Tv className="h-5 w-5" />,
  "Floor heating": <Flame className="h-5 w-5" />,
  "Aux-port": <UsbIcon className="h-5 w-5" />,
  "Solar panel": <Battery className="h-5 w-5" />,
  "Adapter to electrical connection": <Battery className="h-5 w-5" />,
  "Mosquito net": <Check className="h-5 w-5" />,
  "Double bed": <BedDouble className="h-5 w-5" />,
};

const getFeatureIcon = (name: string) => {
  return featureIcons[name] || <Check className="h-5 w-5" />;
};

const KeyFeatures = ({ features }: KeyFeaturesProps) => {
  return (
    <div className="py-6 border-t">
      <h3 className="font-semibold text-lg mb-4">Key Features</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-sm text-primary">
              {getFeatureIcon(feature)}
            </div>
            <span className="text-sm text-center text-gray-700 font-medium">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFeatures;
