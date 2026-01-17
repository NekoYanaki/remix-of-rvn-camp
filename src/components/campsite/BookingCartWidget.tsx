import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Trash2, MapPin, CalendarDays, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./ZoneBookingForm";

interface BookingCartWidgetProps {
  cart: CartItem[];
  onRemoveItem: (itemId: string) => void;
}

const BookingCartWidget = ({ cart, onRemoveItem }: BookingCartWidgetProps) => {
  const navigate = useNavigate();

  const cartTotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleCheckout = () => {
    navigate('/booking-summary', { 
      state: { 
        cart: cart,
        fromCart: true 
      } 
    });
  };

  if (cart.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            รายการจอง
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <ShoppingCart className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm">ยังไม่มีรายการจอง</p>
            <p className="text-xs mt-1">เลือกโซนและวันที่เข้าพักจากด้านซ้าย</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-green-500">
      <CardHeader className="pb-3 bg-green-50 border-b">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-800">
            <ShoppingCart className="h-5 w-5" />
            รายการจอง
          </div>
          <Badge className="bg-green-600">{cart.length} รายการ</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Cart Items */}
        <div className="divide-y max-h-[400px] overflow-y-auto">
          {cart.map((item) => (
            <div key={item.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900">{item.zoneName}</h4>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3" />
                    {item.campsite.name}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveItem(item.id)}
                  className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" />
                  <span>{item.checkIn} - {item.checkOut}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{item.guests} คน</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{item.nights} คืน</span>
                <span className="font-semibold text-green-600">฿{item.totalPrice.toLocaleString()}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Total and Checkout */}
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">ราคารวมทั้งหมด</span>
            <span className="text-xl font-bold text-green-600">฿{cartTotal.toLocaleString()}</span>
          </div>
          
          <Button 
            onClick={handleCheckout}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            size="lg"
          >
            ดำเนินการชำระเงิน
          </Button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            คุณสามารถเพิ่มที่พักอื่นๆ ได้ก่อนชำระเงิน
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCartWidget;
