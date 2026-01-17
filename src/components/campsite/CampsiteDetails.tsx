import { useState } from "react";
import { Users, Car, Truck, Tent, Home, Zap, Wifi, Droplet, Shield, Flame, ParkingCircle, Trash2, Lightbulb, Store, Check, ChevronRight, ChevronLeft, X, Image, TreePine, Volume2, Dog, FileText, Battery, CalendarDays } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { cn } from "@/lib/utils";
import ZoneBookingForm, { CartItem } from "./ZoneBookingForm";

interface AmenityItem {
  name: string;
  images?: string[];
}

interface ZoneAvailability {
  date: Date;
  availableSlots: number;
  totalSlots: number;
}

interface ZoneDetails {
  safety?: string[];
  additionalServices?: string[];
  atmosphere?: string[];
  rules?: {
    petsAllowed?: boolean;
    petRules?: string;
    noisePolicy?: string;
    cancellationPolicy?: string;
  };
}

interface CampsiteDetailsProps {
  campsite: {
    id: string;
    name: string;
    description: string;
    location: {
      address: string;
      city: string;
      country: string;
    };
    stayOptions: Array<{
      type: string;
      description: string;
      maxGuests: number;
      price: number;
      priceType?: 'per_night' | 'per_person';
      slots?: number;
      unit?: string;
      images?: string[];
      supportedVehicles?: string[];
      amenities?: Array<string | AmenityItem>;
      zoneDetails?: ZoneDetails;
      availability?: ZoneAvailability[];
    }>;
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
  onAddToCart: (item: CartItem) => void;
}

// Mock availability data generator
const generateMockAvailability = (totalSlots: number): ZoneAvailability[] => {
  const availability: ZoneAvailability[] = [];
  const today = new Date();
  
  for (let i = 0; i < 60; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    
    // Random available slots (some days fully booked)
    const booked = Math.floor(Math.random() * (totalSlots + 2));
    const availableSlots = Math.max(0, totalSlots - booked);
    
    availability.push({
      date,
      availableSlots,
      totalSlots
    });
  }
  
  return availability;
};

// Zone Availability Calendar Component
const ZoneAvailabilityCalendar = ({ 
  zoneName,
  totalSlots,
  availability
}: { 
  zoneName: string;
  totalSlots: number;
  availability?: ZoneAvailability[];
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const mockAvailability = availability || generateMockAvailability(totalSlots);
  
  const getAvailabilityForDate = (date: Date) => {
    const found = mockAvailability.find(
      a => a.date.toDateString() === date.toDateString()
    );
    return found || { date, availableSlots: totalSlots, totalSlots };
  };
  
  const selectedAvailability = selectedDate ? getAvailabilityForDate(selectedDate) : null;

  const modifiers = {
    fullyBooked: (date: Date) => {
      const avail = getAvailabilityForDate(date);
      return avail.availableSlots === 0;
    },
    limited: (date: Date) => {
      const avail = getAvailabilityForDate(date);
      return avail.availableSlots > 0 && avail.availableSlots <= 3;
    },
    available: (date: Date) => {
      const avail = getAvailabilityForDate(date);
      return avail.availableSlots > 3;
    }
  };

  const modifiersStyles = {
    fullyBooked: { 
      backgroundColor: '#fecaca', 
      color: '#991b1b',
      borderRadius: '4px'
    },
    limited: { 
      backgroundColor: '#fef08a', 
      color: '#854d0e',
      borderRadius: '4px'
    },
    available: { 
      backgroundColor: '#bbf7d0', 
      color: '#166534',
      borderRadius: '4px'
    }
  };

  return (
    <div className="pt-4 mt-4 border-t">
      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
        <CalendarDays className="h-4 w-4 text-blue-600" />
        ปฏิทินว่าง - {zoneName}
      </h4>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {selectedDate ? (
              <span>
                {format(selectedDate, "d MMMM yyyy", { locale: th })} - 
                <span className={cn(
                  "ml-2 font-medium",
                  selectedAvailability?.availableSlots === 0 ? "text-red-600" :
                  selectedAvailability?.availableSlots && selectedAvailability.availableSlots <= 3 ? "text-amber-600" : "text-green-600"
                )}>
                  เหลือ {selectedAvailability?.availableSlots || 0} สล็อต
                </span>
              </span>
            ) : (
              <span>เลือกวันที่เพื่อดูสล็อตว่าง</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            modifiers={modifiers}
            modifiersStyles={modifiersStyles}
            className={cn("p-3 pointer-events-auto")}
            locale={th}
          />
          <div className="p-3 border-t space-y-1.5 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-green-200"></div>
              <span>ว่างมาก (มากกว่า 3 สล็อต)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-yellow-200"></div>
              <span>ใกล้เต็ม (1-3 สล็อต)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-red-200"></div>
              <span>เต็ม</span>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Quick availability summary */}
      <div className="mt-3 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-gray-600">วันนี้: เหลือ {getAvailabilityForDate(new Date()).availableSlots} สล็อต จาก {totalSlots}</span>
        </div>
      </div>
    </div>
  );
};

// Amenity Gallery Modal Component
const AmenityGallery = ({ 
  amenity, 
  isOpen, 
  onClose 
}: { 
  amenity: AmenityItem; 
  isOpen: boolean; 
  onClose: () => void;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const images = amenity.images || [];
  
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (images.length === 0) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="relative">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="relative aspect-video">
            <img 
              src={images[currentIndex]} 
              alt={`${amenity.name} - รูปที่ ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-lg"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
          
          <div className="p-4 bg-white">
            <h3 className="font-semibold text-lg">{amenity.name}</h3>
            {images.length > 1 && (
              <div className="flex gap-2 mt-3">
                {images.map((img, idx) => (
                  <button 
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                      idx === currentIndex ? 'border-green-500' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const CampsiteDetails = ({ campsite, onAddToCart }: CampsiteDetailsProps) => {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityItem | null>(null);
  const [viewingImages, setViewingImages] = useState<{ images: string[]; currentIndex: number; title: string } | null>(null);

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
    if (lower.includes('cctv') || lower.includes('security') || lower.includes('รักษาความปลอดภัย') || lower.includes('ความปลอดภัย')) return Shield;
    if (lower.includes('ครัว') || lower.includes('ปิ้งย่าง') || lower.includes('cook') || lower.includes('kitchen')) return Flame;
    if (lower.includes('จอดรถ') || lower.includes('parking')) return ParkingCircle;
    if (lower.includes('ขยะ') || lower.includes('trash')) return Trash2;
    if (lower.includes('แสงสว่าง') || lower.includes('light')) return Lightbulb;
    if (lower.includes('ร้าน') || lower.includes('shop') || lower.includes('store')) return Store;
    if (lower.includes('ชาร์จ') || lower.includes('ev')) return Battery;
    return Check;
  };

  const getAtmosphereIcon = (item: string) => {
    const lower = item.toLowerCase();
    if (lower.includes('เงียบ') || lower.includes('สงบ')) return Volume2;
    if (lower.includes('สีเขียว') || lower.includes('สวน') || lower.includes('ต้นไม้')) return TreePine;
    return Check;
  };

  return (
    <div className="space-y-8">
      {/* Host Information + About - Combined */}
      <section id="section-host" className="bg-white rounded-lg p-6 border scroll-mt-32">
        <div className="flex items-center gap-4 mb-5">
          <img
            src={campsite.host.avatar}
            alt={campsite.host.name}
            className="w-14 h-14 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{campsite.host.name}</h3>
            <p className="text-sm text-gray-500">เป็นสมาชิกตั้งแต่ปี {campsite.host.joinedDate}</p>
            {campsite.host.phone && (
              <p className="text-sm text-gray-500">📞 {campsite.host.phone}</p>
            )}
          </div>
        </div>
        
        <div id="section-overview" className="scroll-mt-32">
          <h2 className="text-xl font-semibold mb-3">เกี่ยวกับที่พัก</h2>
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
        </div>
      </section>

      {/* Zone Information - ข้อมูลโซน */}
      <section id="section-zones" className="bg-white rounded-lg p-6 border scroll-mt-32">
        <h2 className="text-xl font-semibold mb-6">ข้อมูลโซน</h2>
        <div className="space-y-8">
          {campsite.stayOptions.map((option, index) => {
            const IconComponent = getStayIcon(option.type);
            return (
              <div key={index} className="border rounded-xl overflow-hidden hover:border-green-300 transition-colors">
                {/* Zone Images */}
                {option.images && option.images.length > 0 && (
                  <div className="grid grid-cols-4 gap-1 h-40">
                    {option.images.slice(0, 4).map((img, imgIdx) => (
                      <div 
                        key={imgIdx} 
                        className="relative overflow-hidden cursor-pointer"
                        onClick={() => setViewingImages({ 
                          images: option.images!, 
                          currentIndex: imgIdx, 
                          title: option.type 
                        })}
                      >
                        <img 
                          src={img} 
                          alt={`${option.type} - รูปที่ ${imgIdx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
                        {imgIdx === 3 && option.images!.length > 4 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-semibold">
                            +{option.images!.length - 4}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Zone Info */}
                <div className="p-5">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="bg-green-100 p-3 rounded-lg">
                      <IconComponent className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-gray-900">{option.type}</h3>
                      <p className="text-gray-600 mb-2">{option.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          <span>สูงสุด {option.maxGuests} คน</span>
                        </div>
                        {option.slots && (
                          <div className="flex items-center gap-1">
                            <span>จำนวนสล็อต: {option.slots}</span>
                          </div>
                        )}
                        {option.unit && (
                          <div className="flex items-center gap-1">
                            <span>หน่วย: {option.unit}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">
                        ฿{option.price.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-500">
                        {option.priceType === 'per_person' ? 'ต่อคน/คืน' : 'ต่อคืน'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Zone Supported Vehicles */}
                  {option.supportedVehicles && option.supportedVehicles.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">รถที่รองรับในโซนนี้</h4>
                      <div className="flex flex-wrap gap-2">
                        {option.supportedVehicles.map((vehicle, vIdx) => (
                          <span 
                            key={vIdx}
                            className="px-3 py-1 bg-gray-800 text-white rounded-full text-xs font-medium"
                          >
                            {vehicle}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Zone Amenities with Images */}
                  {option.amenities && option.amenities.length > 0 && (
                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-700 mb-3">สิ่งอำนวยความสะดวกในโซนนี้</h4>
                      
                      {/* Amenities with Images */}
                      {(() => {
                        const withImages = option.amenities.filter(a => {
                          const data = typeof a === 'string' ? { name: a } : a;
                          return data.images && data.images.length > 0;
                        });
                        const withoutImages = option.amenities.filter(a => {
                          const data = typeof a === 'string' ? { name: a } : a;
                          return !data.images || data.images.length === 0;
                        });
                        
                        return (
                          <>
                            {withImages.length > 0 && (
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                                {withImages.map((amenity, aIdx) => {
                                  const amenityData = typeof amenity === 'string' 
                                    ? { name: amenity } 
                                    : amenity;
                                  const AmenityIcon = getAmenityIcon(amenityData.name);
                                  
                                  return (
                                    <div 
                                      key={aIdx} 
                                      className="relative rounded-xl overflow-hidden border cursor-pointer hover:border-green-400 hover:shadow-md transition-all"
                                      onClick={() => setViewingImages({
                                        images: amenityData.images!,
                                        currentIndex: 0,
                                        title: amenityData.name
                                      })}
                                    >
                                      <div className="h-24 relative">
                                        <img 
                                          src={amenityData.images![0]} 
                                          alt={amenityData.name}
                                          className="w-full h-full object-cover"
                                        />
                                        {amenityData.images!.length > 1 && (
                                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg flex items-center gap-1">
                                            <Image className="h-3 w-3" />
                                            {amenityData.images!.length}
                                          </div>
                                        )}
                                      </div>
                                      <div className="p-2.5 bg-white flex items-center gap-2">
                                        <AmenityIcon className="h-4 w-4 text-green-600 flex-shrink-0" />
                                        <span className="text-sm text-gray-700 font-medium truncate">{amenityData.name}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                            
                            {withoutImages.length > 0 && (
                              <div className="grid grid-cols-2 gap-2">
                                {withoutImages.map((amenity, aIdx) => {
                                  const amenityData = typeof amenity === 'string' 
                                    ? { name: amenity } 
                                    : amenity;
                                  
                                  return (
                                    <div 
                                      key={aIdx} 
                                      className="flex items-center gap-2 p-3 bg-green-50 rounded-lg"
                                    >
                                      <Check className="h-4 w-4 text-green-600 flex-shrink-0" />
                                      <span className="text-sm text-gray-700">{amenityData.name}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  )}

                  {/* Zone Details - 4.5 ความปลอดภัย */}
                  {option.zoneDetails?.safety && option.zoneDetails.safety.length > 0 && (
                    <div className="pt-4 mt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        ความปลอดภัยและการรักษาความปลอดภัย
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {option.zoneDetails.safety.map((item, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg text-sm">
                            <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Zone Details - 4.6 บริการเสริม */}
                  {option.zoneDetails?.additionalServices && option.zoneDetails.additionalServices.length > 0 && (
                    <div className="pt-4 mt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <Store className="h-4 w-4 text-purple-600" />
                        บริการเสริมและสิ่งอำนวยความสะดวกอื่นๆ
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {option.zoneDetails.additionalServices.map((item, sIdx) => (
                          <div key={sIdx} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg text-sm">
                            <Check className="h-4 w-4 text-purple-600 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Zone Details - 4.7 บรรยากาศ */}
                  {option.zoneDetails?.atmosphere && option.zoneDetails.atmosphere.length > 0 && (
                    <div className="pt-4 mt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <TreePine className="h-4 w-4 text-green-600" />
                        บรรยากาศและสิ่งแวดล้อม
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {option.zoneDetails.atmosphere.map((item, aIdx) => (
                          <div key={aIdx} className="flex items-center gap-2 p-2 bg-green-50 rounded-lg text-sm">
                            {(() => {
                              const AtmosphereIcon = getAtmosphereIcon(item);
                              return <AtmosphereIcon className="h-4 w-4 text-green-600 flex-shrink-0" />;
                            })()}
                            <span className="text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Zone Details - 4.8 กฎระเบียบ */}
                  {option.zoneDetails?.rules && (
                    <div className="pt-4 mt-4 border-t">
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-orange-600" />
                        กฎระเบียบในการเข้าพัก
                      </h4>
                      <div className="space-y-2">
                        {option.zoneDetails.rules.petsAllowed !== undefined && (
                          <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg text-sm">
                            <Dog className="h-4 w-4 text-orange-600 flex-shrink-0" />
                            <span className="text-gray-700">
                              {option.zoneDetails.rules.petsAllowed ? 'อนุญาตให้นำสัตว์เลี้ยงเข้าพัก' : 'ไม่อนุญาตให้นำสัตว์เลี้ยง'}
                            </span>
                          </div>
                        )}
                        {option.zoneDetails.rules.petRules && (
                          <div className="pl-8 text-sm text-gray-600">
                            กฎเกี่ยวกับสัตว์เลี้ยง: {option.zoneDetails.rules.petRules}
                          </div>
                        )}
                        {option.zoneDetails.rules.noisePolicy && (
                          <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg text-sm">
                            <Volume2 className="h-4 w-4 text-orange-600 flex-shrink-0" />
                            <span className="text-gray-700">{option.zoneDetails.rules.noisePolicy}</span>
                          </div>
                        )}
                        {option.zoneDetails.rules.cancellationPolicy && (
                          <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg text-sm">
                            <FileText className="h-4 w-4 text-orange-600 flex-shrink-0" />
                            <span className="text-gray-700">นโยบายยกเลิก: {option.zoneDetails.rules.cancellationPolicy}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Zone Availability Calendar */}
                  {option.slots && (
                    <ZoneAvailabilityCalendar 
                      zoneName={option.type}
                      totalSlots={option.slots}
                      availability={option.availability}
                    />
                  )}

                  {/* Zone Booking Form */}
                  <ZoneBookingForm
                    zoneType={option.type}
                    zoneName={option.type}
                    maxGuests={option.maxGuests}
                    price={option.price}
                    priceType={option.priceType}
                    slots={option.slots}
                    campsiteId={campsite.id}
                    campsiteName={campsite.name}
                    campsiteLocation={`${campsite.location.city}, ${campsite.location.country}`}
                    onAddToCart={onAddToCart}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Amenity Gallery Modal */}
      {selectedAmenity && (
        <AmenityGallery 
          amenity={selectedAmenity}
          isOpen={!!selectedAmenity}
          onClose={() => setSelectedAmenity(null)}
        />
      )}

      {/* Image Viewer Modal */}
      {viewingImages && (
        <Dialog open={!!viewingImages} onOpenChange={() => setViewingImages(null)}>
          <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black">
            <div className="relative">
              <button 
                onClick={() => setViewingImages(null)}
                className="absolute top-3 right-3 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="relative aspect-video bg-black flex items-center justify-center">
                <img 
                  src={viewingImages.images[viewingImages.currentIndex]} 
                  alt={`${viewingImages.title} - รูปที่ ${viewingImages.currentIndex + 1}`}
                  className="max-w-full max-h-[70vh] object-contain"
                />
                
                {viewingImages.images.length > 1 && (
                  <>
                    <button 
                      onClick={() => setViewingImages({
                        ...viewingImages,
                        currentIndex: (viewingImages.currentIndex - 1 + viewingImages.images.length) % viewingImages.images.length
                      })}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button 
                      onClick={() => setViewingImages({
                        ...viewingImages,
                        currentIndex: (viewingImages.currentIndex + 1) % viewingImages.images.length
                      })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full hover:bg-white transition-colors shadow-lg"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
              
              <div className="p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{viewingImages.title}</h3>
                  <span className="text-sm text-gray-500">
                    {viewingImages.currentIndex + 1} / {viewingImages.images.length}
                  </span>
                </div>
                {viewingImages.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {viewingImages.images.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setViewingImages({ ...viewingImages, currentIndex: idx })}
                        className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                          idx === viewingImages.currentIndex ? 'border-green-500' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
