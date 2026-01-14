
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, ChevronDown, MapPin, Navigation } from "lucide-react";

interface PickupLocation {
  id: string;
  name: string;
  address: string;
}

interface BookingSectionProps {
  motorhome: {
    pricing: {
      basePrice: number;
      insurance: number;
      cleaning: number;
      deposit: number;
      minDays: number;
    };
    rating: number;
    reviewCount: number;
  };
  pickupLocations?: PickupLocation[];
}

export const BookingSection = ({ 
  motorhome, 
  pickupLocations = []
}: BookingSectionProps) => {
  const navigate = useNavigate();
  const [pickupTime, setPickupTime] = useState("10:00");
  const [returnTime, setReturnTime] = useState("10:00");
  const [selectedPickupLocation, setSelectedPickupLocation] = useState(pickupLocations[0]?.id || "");
  const [selectedReturnLocation, setSelectedReturnLocation] = useState(pickupLocations[0]?.id || "");
  const [days, setDays] = useState(1);

  const baseTotal = motorhome.pricing.basePrice * days;
  const totalPrice = baseTotal;

  const handleBookNow = () => {
    navigate("/campervan-summary");
  };

  const handleAddToTrip = () => {
    // Add to trip logic - could be stored in state/context
    navigate("/campervan-summary");
  };

  return (
    <div className="space-y-4">
      <Card className="border shadow-lg">
        <CardContent className="p-4">
          {/* Status Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center gap-1 text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              พร้อมให้บริการ
            </span>
          </div>

          {/* Pickup Time */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              เวลารับรถ
            </label>
            <div className="relative">
              <select
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
              >
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Pickup Location */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <MapPin className="h-4 w-4 text-green-500" />
              สถานที่รับรถ
            </label>
            <div className="relative">
              <select
                value={selectedPickupLocation}
                onChange={(e) => setSelectedPickupLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white text-sm"
              >
                {pickupLocations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Return Time */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Clock className="h-4 w-4 text-primary" />
              เวลาคืนรถ
            </label>
            <div className="relative">
              <select
                value={returnTime}
                onChange={(e) => setReturnTime(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
              >
                <option value="08:00">08:00</option>
                <option value="09:00">09:00</option>
                <option value="10:00">10:00</option>
                <option value="11:00">11:00</option>
                <option value="12:00">12:00</option>
                <option value="13:00">13:00</option>
                <option value="14:00">14:00</option>
                <option value="15:00">15:00</option>
                <option value="16:00">16:00</option>
              </select>
              <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Return Location */}
          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Navigation className="h-4 w-4 text-red-500" />
              สถานที่คืนรถ
            </label>
            <div className="relative">
              <select
                value={selectedReturnLocation}
                onChange={(e) => setSelectedReturnLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white text-sm"
              >
                {pickupLocations.map(location => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-3.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">ราคารวม:</span>
              <span className="font-bold text-lg">{baseTotal.toLocaleString()} THB</span>
            </div>
            <div className="flex justify-between text-red-600">
              <span>ชำระเงินทันที:</span>
              <span className="font-bold text-lg">{totalPrice.toLocaleString()} THB</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
              onClick={handleAddToTrip}
            >
              เพิ่มในทริป
            </Button>
            <Button 
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              onClick={handleBookNow}
            >
              จองเลย →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
