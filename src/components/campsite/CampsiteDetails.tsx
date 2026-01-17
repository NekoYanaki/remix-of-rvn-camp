import { useState } from "react";
import { Users, Car, Truck, Tent, Home, Zap, Wifi, Droplet, Shield, Flame, ParkingCircle, Trash2, Lightbulb, Store, Check, ChevronRight, ChevronLeft, X, Image, TreePine, Volume2, Dog, FileText, Battery } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface AmenityItem {
  name: string;
  images?: string[];
}

interface ZoneDetails {
  safety?: string[]; // 4.5 ความปลอดภัย
  additionalServices?: string[]; // 4.6 บริการเสริม
  atmosphere?: string[]; // 4.7 บรรยากาศ
  rules?: { // 4.8 กฎระเบียบ
    petsAllowed?: boolean;
    petRules?: string;
    noisePolicy?: string;
    cancellationPolicy?: string;
  };
}

interface CampsiteDetailsProps {
  campsite: {
    description: string;
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
    }>;
    amenities: string[];
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

export const CampsiteDetails = ({ campsite }: CampsiteDetailsProps) => {
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityItem | null>(null);

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

  const getSafetyIcon = () => Shield;
  const getServiceIcon = () => Store;
  const getAtmosphereIcon = (item: string) => {
    const lower = item.toLowerCase();
    if (lower.includes('เงียบ') || lower.includes('สงบ')) return Volume2;
    if (lower.includes('สีเขียว') || lower.includes('สวน') || lower.includes('ต้นไม้')) return TreePine;
    return Check;
  };

  return (
    <div className="space-y-8">
      {/* Host Information - First */}
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
                      <div key={imgIdx} className="relative overflow-hidden">
                        <img 
                          src={img} 
                          alt={`${option.type} - รูปที่ ${imgIdx + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                        />
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
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {option.amenities.map((amenity, aIdx) => {
                          const amenityData = typeof amenity === 'string' 
                            ? { name: amenity } 
                            : amenity;
                          const AmenityIcon = getAmenityIcon(amenityData.name);
                          const hasImages = amenityData.images && amenityData.images.length > 0;
                          
                          return (
                            <div 
                              key={aIdx} 
                              className={`relative rounded-lg overflow-hidden border ${hasImages ? 'cursor-pointer hover:border-green-400' : ''}`}
                              onClick={() => hasImages && setSelectedAmenity(amenityData)}
                            >
                              {hasImages ? (
                                <>
                                  <div className="h-20 relative">
                                    <img 
                                      src={amenityData.images![0]} 
                                      alt={amenityData.name}
                                      className="w-full h-full object-cover"
                                    />
                                    {amenityData.images!.length > 1 && (
                                      <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
                                        <Image className="h-3 w-3" />
                                        {amenityData.images!.length}
                                      </div>
                                    )}
                                  </div>
                                  <div className="p-2 bg-gray-50 flex items-center gap-2">
                                    <AmenityIcon className="h-4 w-4 text-green-600 flex-shrink-0" />
                                    <span className="text-sm text-gray-700 truncate">{amenityData.name}</span>
                                  </div>
                                </>
                              ) : (
                                <div className="p-3 bg-gray-50 flex items-center gap-2">
                                  <AmenityIcon className="h-4 w-4 text-green-600 flex-shrink-0" />
                                  <span className="text-sm text-gray-700 truncate">{amenityData.name}</span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
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
                </div>
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

      {/* Amenity Gallery Modal */}
      {selectedAmenity && (
        <AmenityGallery 
          amenity={selectedAmenity}
          isOpen={!!selectedAmenity}
          onClose={() => setSelectedAmenity(null)}
        />
      )}
    </div>
  );
};
