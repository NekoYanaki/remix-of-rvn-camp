import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Bed, Settings, Fuel } from "lucide-react";

export interface Campervan {
  id: number;
  name: string;
  brand: string;
  seats: number;
  beds: number;
  transmission: string;
  fuelType: string;
  pricePerDay: number;
  image: string;
  amenities: string[];
}

interface CampervanResultCardProps {
  campervan: Campervan;
  onSelect: (campervan: Campervan) => void;
}

const CampervanResultCard = ({ campervan, onSelect }: CampervanResultCardProps) => {
  const displayedAmenities = campervan.amenities.slice(0, 5);
  const remainingAmenities = campervan.amenities.length - 5;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="w-full md:w-80 h-56 md:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={campervan.image}
            alt={campervan.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex flex-col h-full">
            {/* Title & Brand */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground">
                {campervan.name}
              </h3>
              <p className="text-sm text-muted-foreground uppercase">
                {campervan.brand}
              </p>
            </div>

            {/* Specs */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                <span>{campervan.seats} ที่นั่ง</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="w-4 h-4 text-primary" />
                <span>{campervan.beds} ที่นอน</span>
              </div>
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-primary" />
                <span>{campervan.transmission}</span>
              </div>
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-primary" />
                <span>{campervan.fuelType}</span>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex flex-wrap gap-2 mb-4">
              {displayedAmenities.map((amenity) => (
                <span
                  key={amenity}
                  className="text-xs border border-border px-3 py-1.5 rounded-full text-muted-foreground"
                >
                  {amenity}
                </span>
              ))}
              {remainingAmenities > 0 && (
                <span className="text-xs border border-border px-3 py-1.5 rounded-full text-muted-foreground">
                  +{remainingAmenities} รายการ
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="border-t border-border my-4" />

            {/* Price & Action */}
            <div className="flex items-center justify-between mt-auto">
              <div />
              <div className="text-right">
                <p className="text-2xl font-bold text-destructive">
                  ฿{campervan.pricePerDay.toLocaleString()}
                  <span className="text-base font-normal text-muted-foreground ml-1">/ วัน</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  รวมประกันพื้นฐาน
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CampervanResultCard;
