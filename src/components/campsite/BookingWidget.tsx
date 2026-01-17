
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Users, ShoppingCart, Plus, Minus, Check, Truck, Car, Tent, Home } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { th } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

interface StayOption {
  type: string;
  description: string;
  maxGuests: number;
  price: number;
  image?: string;
}

interface CartItem {
  campsite: {
    id: string;
    name: string;
    location: string;
  };
  stayOption: StayOption;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: number;
  totalPrice: number;
}

interface BookingWidgetProps {
  campsite: {
    id: string;
    name: string;
    price: number;
    stayOptions: StayOption[];
    location: {
      city: string;
      country: string;
    };
    supportedVehicles?: string[];
  };
}

const BookingWidget = ({ campsite }: BookingWidgetProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedOptions, setSelectedOptions] = useState<{[key: string]: number}>({});
  const [guests, setGuests] = useState(2);
  
  // Get dates from search params if available
  const checkinParam = searchParams.get('checkin');
  const checkoutParam = searchParams.get('checkout');
  
  const [date, setDate] = useState<DateRange | undefined>(() => {
    if (checkinParam && checkoutParam) {
      return {
        from: new Date(checkinParam),
        to: new Date(checkoutParam)
      };
    }
    return undefined;
  });

  // Get cart from localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('booking_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const getStayIcon = (type: string) => {
    const lower = type.toLowerCase();
    if (lower.includes('รถบ้าน') || lower.includes('motorhome') || lower.includes('caravan')) return Truck;
    if (lower.includes('campervan') || lower.includes('camper')) return Car;
    if (lower.includes('เต็นท์') || lower.includes('tent')) return Tent;
    return Home;
  };

  const calculateNights = () => {
    if (!date?.from || !date?.to) return 0;
    return differenceInDays(date.to, date.from);
  };

  const nights = calculateNights();

  const updateQuantity = (optionType: string, delta: number) => {
    setSelectedOptions(prev => {
      const current = prev[optionType] || 0;
      const newValue = Math.max(0, current + delta);
      if (newValue === 0) {
        const { [optionType]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [optionType]: newValue };
    });
  };

  const getTotalItems = () => {
    return Object.values(selectedOptions).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    let total = 0;
    Object.entries(selectedOptions).forEach(([type, qty]) => {
      const option = campsite.stayOptions.find(o => o.type === type);
      if (option) {
        total += option.price * qty * nights;
      }
    });
    return total;
  };

  const handleAddToCart = () => {
    if (!date?.from || !date?.to) {
      toast.error('กรุณาเลือกวันที่เช็คอิน-เช็คเอาท์');
      return;
    }

    if (getTotalItems() === 0) {
      toast.error('กรุณาเลือกที่พักอย่างน้อย 1 รายการ');
      return;
    }

    const newItems: CartItem[] = [];
    Object.entries(selectedOptions).forEach(([type, qty]) => {
      const option = campsite.stayOptions.find(o => o.type === type);
      if (option && qty > 0) {
        for (let i = 0; i < qty; i++) {
          newItems.push({
            campsite: {
              id: campsite.id,
              name: campsite.name,
              location: `${campsite.location.city}, ${campsite.location.country}`
            },
            stayOption: option,
            checkIn: format(date.from!, 'yyyy-MM-dd'),
            checkOut: format(date.to!, 'yyyy-MM-dd'),
            nights: nights,
            guests: guests,
            totalPrice: option.price * nights
          });
        }
      }
    });

    const updatedCart = [...cart, ...newItems];
    setCart(updatedCart);
    localStorage.setItem('booking_cart', JSON.stringify(updatedCart));
    
    toast.success(
      <div className="flex items-center gap-2">
        <Check className="h-4 w-4" />
        <span>เพิ่ม {newItems.length} รายการลงตะกร้าแล้ว</span>
      </div>
    );
    
    // Reset selections after adding to cart
    setSelectedOptions({});
  };

  const handleViewCart = () => {
    navigate('/booking-summary', { 
      state: { 
        cart: cart,
        fromCart: true 
      } 
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="space-y-4">
      {/* Cart Summary - Always visible if cart has items */}
      {cart.length > 0 && (
        <Card className="border-2 border-green-500 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">
                  ตะกร้าของคุณ ({cart.length} รายการ)
                </span>
              </div>
              <Badge className="bg-green-600">
                ฿{cartTotal.toLocaleString()}
              </Badge>
            </div>
            <Button 
              onClick={handleViewCart}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              ดูตะกร้าและชำระเงิน
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Main Booking Card */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">เลือกที่พักสำหรับทริปของคุณ</CardTitle>
          <p className="text-sm text-gray-500">เลือกวันที่และประเภทที่พัก แล้วเพิ่มลงตะกร้า</p>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Date Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">วันที่เข้าพัก</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline" 
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "d MMM", { locale: th })} - {format(date.to, "d MMM yyyy", { locale: th })}
                        <Badge variant="secondary" className="ml-auto">
                          {nights} คืน
                        </Badge>
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
          <div className="space-y-2">
            <label className="text-sm font-medium">จำนวนผู้เข้าพัก</label>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                className="h-8 w-8 rounded-full p-0"
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-8 text-center font-medium">{guests}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGuests(guests + 1)}
                className="h-8 w-8 rounded-full p-0"
              >
                <Plus className="h-3 w-3" />
              </Button>
              <span className="text-sm text-gray-500">คน</span>
            </div>
          </div>

          {/* Stay Options - Select quantity for each */}
          <div className="space-y-3">
            <label className="text-sm font-medium">เลือกประเภทที่พัก</label>
            {campsite.stayOptions.map((option) => {
              const IconComponent = getStayIcon(option.type);
              const quantity = selectedOptions[option.type] || 0;
              
              return (
                <div 
                  key={option.type} 
                  className={cn(
                    "border rounded-lg p-4 transition-all",
                    quantity > 0 ? "border-green-500 bg-green-50" : "border-gray-200"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      quantity > 0 ? "bg-green-200" : "bg-gray-100"
                    )}>
                      <IconComponent className={cn(
                        "h-5 w-5",
                        quantity > 0 ? "text-green-700" : "text-gray-600"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{option.type}</h4>
                      <p className="text-xs text-gray-500 line-clamp-1">{option.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="h-3 w-3 text-gray-400" />
                        <span className="text-xs text-gray-500">สูงสุด {option.maxGuests} คน</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        ฿{option.price.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">/คืน</div>
                    </div>
                  </div>
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between mt-3 pt-3 border-t">
                    <span className="text-sm text-gray-600">
                      {nights > 0 && quantity > 0 && (
                        <span className="font-medium text-green-600">
                          ฿{(option.price * nights * quantity).toLocaleString()} ({quantity} x {nights} คืน)
                        </span>
                      )}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(option.type, -1)}
                        disabled={quantity === 0}
                        className="h-7 w-7 rounded-full p-0"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center font-medium">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(option.type, 1)}
                        className="h-7 w-7 rounded-full p-0"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          {getTotalItems() > 0 && nights > 0 && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>จำนวนที่พัก</span>
                <span>{getTotalItems()} รายการ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>จำนวนคืน</span>
                <span>{nights} คืน</span>
              </div>
              <div className="flex justify-between font-semibold text-lg border-t pt-2">
                <span>ราคารวม</span>
                <span className="text-green-600">฿{getTotalPrice().toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <Button 
            onClick={handleAddToCart}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
            size="lg"
            disabled={!date?.from || !date?.to || getTotalItems() === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            เพิ่มลงตะกร้า
          </Button>

          <p className="text-xs text-gray-500 text-center">
            คุณสามารถเพิ่มที่พักหลายแห่งในทริปเดียวกันได้
          </p>
        </CardContent>
      </Card>

      {/* Vehicle Support Info */}
      {campsite.supportedVehicles && campsite.supportedVehicles.length > 0 && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">พาหนะที่รองรับ</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2">
              {campsite.supportedVehicles.map((vehicle, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {vehicle}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookingWidget;
