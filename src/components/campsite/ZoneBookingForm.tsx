import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Users, Minus, Plus, Check } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { th } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { toast } from "sonner";

interface ZoneBookingFormProps {
  zoneType: string;
  zoneName: string;
  maxGuests: number;
  price: number;
  priceType?: 'per_night' | 'per_person';
  slots?: number;
  campsiteId: string;
  campsiteName: string;
  campsiteLocation: string;
  onAddToCart: (item: CartItem) => void;
}

export interface CartItem {
  id: string;
  campsite: {
    id: string;
    name: string;
    location: string;
  };
  zoneName: string;
  zoneType: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  pricePerNight: number;
  totalPrice: number;
}

const ZoneBookingForm = ({
  zoneType,
  zoneName,
  maxGuests,
  price,
  priceType = 'per_night',
  slots,
  campsiteId,
  campsiteName,
  campsiteLocation,
  onAddToCart
}: ZoneBookingFormProps) => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);
  const [guests, setGuests] = useState(2);

  const calculateNights = () => {
    if (!date?.from || !date?.to) return 0;
    return differenceInDays(date.to, date.from);
  };

  const nights = calculateNights();

  const calculatePrice = () => {
    if (priceType === 'per_person') {
      return price * guests * nights;
    }
    return price * nights;
  };

  const handleBook = () => {
    if (!date?.from || !date?.to) {
      toast.error('กรุณาเลือกวันที่เช็คอิน-เช็คเอาท์');
      return;
    }

    const cartItem: CartItem = {
      id: `${campsiteId}-${zoneType}-${Date.now()}`,
      campsite: {
        id: campsiteId,
        name: campsiteName,
        location: campsiteLocation
      },
      zoneName: zoneName,
      zoneType: zoneType,
      checkIn: format(date.from, 'yyyy-MM-dd'),
      checkOut: format(date.to, 'yyyy-MM-dd'),
      nights: nights,
      guests: guests,
      pricePerNight: price,
      totalPrice: calculatePrice()
    };

    onAddToCart(cartItem);
    
    toast.success(
      <div className="flex items-center gap-2">
        <Check className="h-4 w-4" />
        <span>เพิ่ม {zoneName} เข้าสู่รายการจองแล้ว</span>
      </div>
    );

    // Reset form
    setDate(undefined);
    setGuests(2);
  };

  return (
    <div className="bg-green-50 rounded-lg p-4 mt-4">
      <h4 className="text-sm font-semibold text-green-800 mb-3">จองโซนนี้</h4>
      
      <div className="space-y-3">
        {/* Date Selection */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">วันที่เข้าพัก</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal h-9 text-sm bg-white",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "d MMM", { locale: th })} - {format(date.to, "d MMM", { locale: th })}
                      <span className="ml-auto text-green-600 font-medium">{nights} คืน</span>
                    </>
                  ) : (
                    format(date.from, "d MMM yyyy", { locale: th })
                  )
                ) : (
                  "เลือกวันเช็คอิน - เช็คเอาท์"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                className="bg-white"
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div>
          <label className="text-xs font-medium text-gray-600 mb-1 block">จำนวนผู้เข้าพัก (สูงสุด {maxGuests} คน)</label>
          <div className="flex items-center gap-3 bg-white p-2 rounded-lg border">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              className="h-7 w-7 rounded-full p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-gray-500" />
              <span className="w-6 text-center font-medium">{guests}</span>
              <span className="text-sm text-gray-500">คน</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
              disabled={guests >= maxGuests}
              className="h-7 w-7 rounded-full p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Price Summary */}
        {nights > 0 && (
          <div className="bg-white rounded-lg p-3 border">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>฿{price.toLocaleString()} x {nights} คืน {priceType === 'per_person' ? `x ${guests} คน` : ''}</span>
              <span>฿{calculatePrice().toLocaleString()}</span>
            </div>
            <div className="flex justify-between font-semibold text-green-700 pt-2 border-t">
              <span>ราคารวม</span>
              <span>฿{calculatePrice().toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Book Button */}
        <Button
          onClick={handleBook}
          className="w-full bg-green-600 hover:bg-green-700 text-white"
          disabled={!date?.from || !date?.to}
        >
          จองที่พักในโซนนี้
        </Button>
      </div>
    </div>
  );
};

export default ZoneBookingForm;
