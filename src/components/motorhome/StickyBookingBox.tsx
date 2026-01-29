import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock,
  ChevronDown,
  MapPin,
  Navigation,
  Star,
  Shield,
  AlertCircle,
  Plus,
  ArrowRight,
} from "lucide-react";

interface PickupLocation {
  id: string;
  name: string;
  address: string;
}

interface StickyBookingBoxProps {
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
  availabilityHint?: string;
}

const StickyBookingBox = ({
  pricing,
  rating,
  reviewCount,
  pickupLocations,
  cancellationPolicy = "ยกเลิกฟรีก่อน 48 ชม.",
  availabilityHint = "เหลือเพียง 2 คันในช่วงนี้",
}: StickyBookingBoxProps) => {
  const navigate = useNavigate();
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("10:00");
  const [selectedPickupLocation, setSelectedPickupLocation] = useState(
    pickupLocations[0]?.id || ""
  );
  const [selectedReturnLocation, setSelectedReturnLocation] = useState(
    pickupLocations[0]?.id || ""
  );
  const [days] = useState(1);

  const baseTotal = pricing.basePrice * days;
  const totalPrice = baseTotal + pricing.insurance;

  const handleBookNow = () => {
    navigate("/campervan-summary");
  };

  const handleAddToTrip = () => {
    navigate("/campervan-summary");
  };

  const timeOptions = [
    "08:00", "09:00", "10:00", "11:00", "12:00",
    "13:00", "14:00", "15:00", "16:00", "17:00",
  ];

  return (
    <Card className="border shadow-xl rounded-xl overflow-hidden">
      <CardContent className="p-5 space-y-4">
        {/* Price Header */}
        <div className="flex items-baseline justify-between pb-3 border-b">
          <div>
            <span className="text-2xl font-bold text-primary">
              ฿{pricing.basePrice.toLocaleString()}
            </span>
            <span className="text-muted-foreground text-sm">/วัน</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="font-medium">{rating}</span>
            <span className="text-muted-foreground">({reviewCount})</span>
          </div>
        </div>

        {/* Pickup Section */}
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Pickup Time */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                เวลารับรถ
              </label>
              <div className="relative">
                <select
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="w-full p-2.5 text-sm border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                >
                  {timeOptions.map((time) => (
                    <option key={`pickup-${time}`} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Return Time */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
                <Clock className="h-3.5 w-3.5 text-primary" />
                เวลาคืนรถ
              </label>
              <div className="relative">
                <select
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                  className="w-full p-2.5 text-sm border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
                >
                  {timeOptions.map((time) => (
                    <option key={`return-${time}`} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Pickup Location */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
              <MapPin className="h-3.5 w-3.5 text-green-500" />
              สถานที่รับรถ
            </label>
            <div className="relative">
              <select
                value={selectedPickupLocation}
                onChange={(e) => setSelectedPickupLocation(e.target.value)}
                className="w-full p-2.5 text-sm border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
              >
                {pickupLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Return Location */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-1.5">
              <Navigation className="h-3.5 w-3.5 text-red-500" />
              สถานที่คืนรถ
            </label>
            <div className="relative">
              <select
                value={selectedReturnLocation}
                onChange={(e) => setSelectedReturnLocation(e.target.value)}
                className="w-full p-2.5 text-sm border rounded-lg bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary appearance-none"
              >
                {pickupLocations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-muted/30 rounded-lg p-3 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">ค่าเช่า ({days} วัน)</span>
            <span>฿{baseTotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">ประกัน</span>
            <span>฿{pricing.insurance.toLocaleString()}</span>
          </div>
          <div className="flex justify-between pt-2 border-t font-semibold">
            <span>ยอดรวม</span>
            <span className="text-primary text-lg">
              ฿{totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Trust Cues */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="h-3.5 w-3.5 text-green-500" />
            <span>{cancellationPolicy}</span>
          </div>
          <div className="flex items-center gap-2 text-amber-600">
            <AlertCircle className="h-3.5 w-3.5" />
            <span className="font-medium">{availabilityHint}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          <Button
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11"
            onClick={handleBookNow}
          >
            จองเลย
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            className="w-full h-10"
            onClick={handleAddToTrip}
          >
            <Plus className="h-4 w-4 mr-2" />
            เพิ่มในทริป
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StickyBookingBox;
