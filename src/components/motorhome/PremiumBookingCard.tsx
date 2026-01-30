import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  MapPin,
  Shield,
} from "lucide-react";

interface PickupLocation {
  id: string;
  name: string;
  address: string;
}

interface PremiumBookingCardProps {
  pricing: {
    basePrice: number;
    insurance: number;
    cleaning: number;
    deposit: number;
    minDays: number;
  };
  rating: number;
  reviewCount: number;
  pickupLocations: PickupLocation[];
  cancellationPolicy?: string;
}

const PremiumBookingCard = ({
  pricing,
  pickupLocations,
  cancellationPolicy = "ยกเลิกฟรีก่อน 48 ชม.",
}: PremiumBookingCardProps) => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(pickupLocations[0]?.id || "");

  const handleBookNow = () => {
    navigate("/campervan-summary");
  };

  return (
    <div className="bg-card border border-border/50 rounded-3xl p-8 shadow-sm space-y-8">
      {/* Price Section - Calm, neutral */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-light tracking-tight text-foreground">
            ฿{pricing.basePrice.toLocaleString()}
          </span>
          <span className="text-muted-foreground font-normal">/วัน</span>
        </div>
        <p className="text-sm text-muted-foreground">
          อุปกรณ์พื้นฐานรวมอยู่ในราคา
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/50" />

      {/* Pickup Location */}
      <div className="space-y-3">
        <label className="text-sm font-medium text-foreground/80">
          สถานที่รับ-คืนรถ
        </label>
        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full pl-11 pr-10 py-4 text-sm border border-border/50 rounded-2xl bg-background focus:ring-1 focus:ring-primary/30 focus:border-primary/50 appearance-none cursor-pointer transition-all"
          >
            {pickupLocations.map((location) => (
              <option key={location.id} value={location.id}>
                {location.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 pointer-events-none" />
        </div>
      </div>

      {/* CTA Button - Clean, confident */}
      <Button
        size="lg"
        className="w-full h-14 text-base font-medium rounded-2xl"
        onClick={handleBookNow}
      >
        จองรถบ้านคันนี้
      </Button>

      {/* Trust Badge - Minimal */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground/70">
        <Shield className="h-4 w-4" />
        <span>{cancellationPolicy}</span>
      </div>
    </div>
  );
};

export default PremiumBookingCard;
