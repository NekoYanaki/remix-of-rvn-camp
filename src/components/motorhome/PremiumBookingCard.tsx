import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  MapPin,
  Star,
  Shield,
  Calendar,
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
  rating,
  reviewCount,
  pickupLocations,
  cancellationPolicy = "ยกเลิกฟรีก่อน 48 ชม.",
}: PremiumBookingCardProps) => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState(pickupLocations[0]?.id || "");

  const handleBookNow = () => {
    navigate("/campervan-summary");
  };

  return (
    <Card className="border-0 shadow-2xl rounded-2xl overflow-hidden bg-card">
      <CardContent className="p-6 space-y-6">
        {/* Price & Rating */}
        <div className="space-y-3">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight">
              ฿{pricing.basePrice.toLocaleString()}
            </span>
            <span className="text-muted-foreground">/วัน</span>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-medium">{rating}</span>
          </div>
            <span className="text-muted-foreground">• {reviewCount} รีวิว</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Pickup Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            สถานที่รับ-คืนรถ
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full pl-10 pr-10 py-3 text-sm border rounded-xl bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none cursor-pointer"
            >
              {pickupLocations.map((location) => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Date Hint */}
        <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>เลือกวันที่รับ-คืนรถในขั้นตอนถัดไป</span>
        </div>

        {/* CTA Button */}
        <Button
          size="lg"
          className="w-full h-12 text-base font-medium rounded-xl shadow-lg"
          onClick={handleBookNow}
        >
          จองรถบ้านคันนี้
        </Button>

        {/* Trust Badge */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4 text-primary" />
          <span>{cancellationPolicy}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumBookingCard;
