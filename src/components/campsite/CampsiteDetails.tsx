
import React from "react";
import { Users, Car, Truck, Tent, Home, Zap, Wifi, Droplet, Shield, Flame, ParkingCircle, Trash2, Lightbulb, Store, Check, X } from "lucide-react";

interface CampsiteDetailsProps {
  campsite: {
    description: string;
    stayOptions: Array<{
      type: string;
      description: string;
      maxGuests: number;
      price: number;
    }>;
    amenities: string[];
    activities: string[];
    supportedVehicles?: string[];
    host: {
      name: string;
      avatar: string;
      joinedDate: string;
      phone?: string;
      email?: string;
    };
    checkIn?: string;
    checkOut?: string;
  };
}

export const CampsiteDetails = ({ campsite }: CampsiteDetailsProps) => {
  const getStayIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('เต็นท์') || lowerType.includes('tent')) return Tent;
    if (lowerType.includes('รถบ้าน') || lowerType.includes('rv') || lowerType.includes('motorhome') || lowerType.includes('caravan')) return Truck;
    if (lowerType.includes('campervan') || lowerType.includes('camper')) return Car;
    if (lowerType.includes('cabin') || lowerType.includes('บังกะโล') || lowerType.includes('บ้าน')) return Home;
    return Tent;
  };

  const getAmenityIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi') || lower.includes('ไวไฟ') || lower.includes('อินเทอร์เน็ต')) return Wifi;
    if (lower.includes('ไฟฟ้า') || lower.includes('electric')) return Zap;
    if (lower.includes('น้ำ') || lower.includes('water') || lower.includes('ประปา')) return Droplet;
    if (lower.includes('cctv') || lower.includes('security') || lower.includes('รักษาความปลอดภัย')) return Shield;
    if (lower.includes('ครัว') || lower.includes('ปิ้งย่าง') || lower.includes('cook') || lower.includes('kitchen')) return Flame;
    if (lower.includes('จอดรถ') || lower.includes('parking')) return ParkingCircle;
    if (lower.includes('ขยะ') || lower.includes('trash')) return Trash2;
    if (lower.includes('แสงสว่าง') || lower.includes('light')) return Lightbulb;
    if (lower.includes('ร้าน') || lower.includes('shop') || lower.includes('store')) return Store;
    return Check;
  };

  const getVehicleIcon = (vehicle: string) => {
    const lower = vehicle.toLowerCase();
    if (lower.includes('caravan') || lower.includes('motorhome')) return Truck;
    if (lower.includes('campervan') || lower.includes('camper')) return Car;
    if (lower.includes('tent') || lower.includes('เต็นท์')) return Tent;
    return Car;
  };

  // Vehicles supported by this campsite
  const supportedVehicles = campsite.supportedVehicles || [
    "Caravan",
    "Motorhome A Class",
    "Motorhome B Class",
    "Motorhome C Class",
    "Campervan"
  ];

  return (
    <div className="space-y-8">
      {/* Description */}
      <section id="section-overview" className="bg-white rounded-lg p-6 border scroll-mt-32">
        <h2 className="text-xl font-semibold mb-4">เกี่ยวกับที่พัก</h2>
        <p className="text-gray-700 leading-relaxed text-base">{campsite.description}</p>
        
        {/* Check-in/out times */}
        {(campsite.checkIn || campsite.checkOut) && (
          <div className="mt-4 flex gap-6 text-sm">
            {campsite.checkIn && (
              <div className="flex items-center gap-2">
                <span className="font-medium">เช็คอิน:</span>
                <span className="text-gray-600">{campsite.checkIn} น.</span>
              </div>
            )}
            {campsite.checkOut && (
              <div className="flex items-center gap-2">
                <span className="font-medium">เช็คเอาท์:</span>
                <span className="text-gray-600">{campsite.checkOut} น.</span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Stay Options with Prices */}
      <section id="section-stayoptions" className="bg-white rounded-lg p-6 border scroll-mt-32">
        <h2 className="text-xl font-semibold mb-4">ประเภทที่พักและราคา</h2>
        <div className="space-y-4">
          {campsite.stayOptions.map((option, index) => {
            const IconComponent = getStayIcon(option.type);
            return (
              <div key={index} className="border rounded-lg p-4 hover:border-green-300 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <IconComponent className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{option.type}</h3>
                    <p className="text-gray-600 mb-2">{option.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        <span>สูงสุด {option.maxGuests} คน</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      ฿{option.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">ต่อคืน</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Supported Vehicles */}
      <section id="section-vehicles" className="bg-white rounded-lg p-6 border scroll-mt-32">
        <h2 className="text-xl font-semibold mb-4">พาหนะที่รองรับ</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {supportedVehicles.map((vehicle, index) => {
            const IconComponent = getVehicleIcon(vehicle);
            return (
              <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <IconComponent className="h-5 w-5 text-green-600" />
                <span className="text-gray-700 font-medium">{vehicle}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Amenities */}
      <section id="section-facilities" className="bg-white rounded-lg p-6 border scroll-mt-32">
        <h2 className="text-xl font-semibold mb-4">สิ่งอำนวยความสะดวก</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {campsite.amenities.map((amenity, index) => {
            const IconComponent = getAmenityIcon(amenity);
            return (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <IconComponent className="h-5 w-5 text-green-600" />
                <span className="text-gray-700">{amenity}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Activities */}
      <section id="section-activities" className="bg-white rounded-lg p-6 border scroll-mt-32">
        <h2 className="text-xl font-semibold mb-4">กิจกรรมที่น่าสนใจ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {campsite.activities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-gray-700">{activity}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Host Information */}
      <section id="section-host" className="bg-white rounded-lg p-6 border scroll-mt-32">
        <h2 className="text-xl font-semibold mb-4">เจ้าของที่พัก</h2>
        <div className="flex items-center gap-4">
          <img
            src={campsite.host.avatar}
            alt={campsite.host.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{campsite.host.name}</h3>
            <p className="text-gray-600">เป็นสมาชิกตั้งแต่ปี {campsite.host.joinedDate}</p>
            {campsite.host.phone && (
              <p className="text-sm text-gray-500 mt-1">📞 {campsite.host.phone}</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
