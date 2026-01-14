
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Star,
  Check,
  X,
  Grid3x3,
  ChevronLeft,
  ChevronRight,
  Ruler,
  Car,
  Fuel,
  Calendar,
  Settings,
  Gauge,
  Users,
  BedDouble,
  Wifi,
  Snowflake,
  Tv,
  Refrigerator,
  ShowerHead,
  Utensils,
  Flame,
  Battery,
  Armchair
} from "lucide-react";
import { BookingSection } from "./BookingSection";
import { ReviewsSection } from "./ReviewsSection";

interface Addon {
  id: string;
  name: string;
  price: number;
  description: string;
}

interface InsuranceOption {
  id: string;
  name: string;
  price: number;
  description: string;
  coverage: string;
}

interface Amenity {
  name: string;
  available: boolean;
}

interface PickupLocation {
  id: string;
  name: string;
  address: string;
}

interface MotorhomeDetailPageProps {
  motorhome: {
    id: string;
    name: string;
    model: string;
    brand: string;
    images: string[];
    price: number;
    rating: number;
    reviewCount: number;
    description: string;
    badges: string[];
    specs: {
      passengers: number;
      beds: number;
      transmission: string;
      fuelType: string;
      year: number;
      drive: string;
      engine: string;
    };
    dimensions: {
      length: string;
      width: string;
      height: string;
      wheelbase: string;
    };
    amenities: Amenity[];
    addons: Addon[];
    insuranceOptions: InsuranceOption[];
    pickupLocations: PickupLocation[];
    pricing: {
      basePrice: number;
      insurance: number;
      cleaning: number;
      deposit: number;
      minDays: number;
    };
    terms: {
      minAge: number;
      license: string[];
      cancellation: string;
      payment: string[];
    };
  };
}

// Icon mapping for amenities
const amenityIcons: Record<string, React.ReactNode> = {
  "WiFi": <Wifi className="h-5 w-5 text-green-600" />,
  "แอร์": <Snowflake className="h-5 w-5 text-blue-500" />,
  "เครื่องปรับอากาศ": <Snowflake className="h-5 w-5 text-blue-500" />,
  "ทีวี": <Tv className="h-5 w-5 text-purple-500" />,
  "ตู้เย็น": <Refrigerator className="h-5 w-5 text-cyan-500" />,
  "ห้องน้ำ": <ShowerHead className="h-5 w-5 text-blue-400" />,
  "ห้องอาบน้ำ": <ShowerHead className="h-5 w-5 text-blue-400" />,
  "เตาแก๊ส": <Flame className="h-5 w-5 text-orange-500" />,
  "ครัว": <Utensils className="h-5 w-5 text-amber-600" />,
  "โซลาร์เซลล์": <Battery className="h-5 w-5 text-yellow-500" />,
  "เตียงนอน": <BedDouble className="h-5 w-5 text-indigo-500" />,
  "โซฟา": <Armchair className="h-5 w-5 text-rose-500" />,
};

const getAmenityIcon = (name: string) => {
  return amenityIcons[name] || <Check className="h-5 w-5 text-green-500" />;
};

const MotorhomeDetailPage = ({ motorhome }: MotorhomeDetailPageProps) => {
  const navigate = useNavigate();
  
  // State for gallery modal
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Refs for scrolling to sections
  const overviewRef = useRef<HTMLDivElement>(null);
  const dimensionsRef = useRef<HTMLDivElement>(null);
  const floorplanRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const yOffset = -140;
      const y = ref.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const tabs = [
    { label: "หน้าแรก", ref: overviewRef },
    { label: "ข้อมูลรถ", ref: overviewRef },
    { label: "ติดต่อเรา", ref: reviewsRef },
  ];

  const openGalleryModal = (index: number) => {
    setSelectedImageIndex(index);
    setShowGalleryModal(true);
  };

  const closeGalleryModal = () => {
    setShowGalleryModal(false);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % motorhome.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + motorhome.images.length) % motorhome.images.length);
  };

  // Filter only available amenities
  const availableAmenities = motorhome.amenities.filter(amenity => amenity.available);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{motorhome.name}</h1>
                <div className="flex items-center gap-2">
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs font-medium">
                    {motorhome.badges[0]}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold">฿{motorhome.price.toLocaleString()}</span>
              <span className="text-gray-600">/วัน</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="relative h-[400px] cursor-pointer" onClick={() => openGalleryModal(0)}>
        <img
          src={motorhome.images[0]}
          alt={motorhome.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
          Main campervan view
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600">{motorhome.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Vehicle Specs Section with Icons */}
            <div ref={overviewRef} className="bg-white">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                ข้อมูลจำเพาะ
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">ปี</p>
                    <p className="font-medium">{motorhome.specs.year}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Fuel className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="text-xs text-gray-500">เชื้อเพลิง</p>
                    <p className="font-medium">{motorhome.specs.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Gauge className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="text-xs text-gray-500">เครื่องยนต์</p>
                    <p className="font-medium">{motorhome.specs.engine}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Settings className="h-6 w-6 text-gray-600" />
                  <div>
                    <p className="text-xs text-gray-500">เกียร์</p>
                    <p className="font-medium">{motorhome.specs.transmission}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Car className="h-6 w-6 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500">ระบบขับเคลื่อน</p>
                    <p className="font-medium">{motorhome.specs.drive}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Users className="h-6 w-6 text-purple-500" />
                  <div>
                    <p className="text-xs text-gray-500">ผู้โดยสาร</p>
                    <p className="font-medium">{motorhome.specs.passengers} คน</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <BedDouble className="h-6 w-6 text-indigo-500" />
                  <div>
                    <p className="text-xs text-gray-500">เตียงนอน</p>
                    <p className="font-medium">{motorhome.specs.beds} เตียง</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dimensions Section */}
            <div ref={dimensionsRef} className="bg-white border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Ruler className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">ขนาดรถ</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">ความยาว</p>
                  <p className="font-bold text-lg">{motorhome.dimensions.length}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">ความกว้าง</p>
                  <p className="font-bold text-lg">{motorhome.dimensions.width}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">ความสูง</p>
                  <p className="font-bold text-lg">{motorhome.dimensions.height}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm mb-1">ฐานล้อ</p>
                  <p className="font-bold text-lg">{motorhome.dimensions.wheelbase}</p>
                </div>
              </div>
            </div>

            {/* Floorplan / Gallery Section */}
            <div ref={floorplanRef} className="bg-white border-t pt-6">
              <div className="flex items-center gap-2 mb-4">
                <Grid3x3 className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-lg">แผนผัง</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {motorhome.images.slice(1).map((image, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                    onClick={() => openGalleryModal(index + 1)}
                  >
                    <img
                      src={image}
                      alt={`${motorhome.name} view ${index + 2}`}
                      className="w-full h-full object-cover group-hover:brightness-95 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities Section - Only show available */}
            <div ref={amenitiesRef} className="bg-white border-t pt-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                สิ่งอำนวยความสะดวก
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {availableAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                    {getAmenityIcon(amenity.name)}
                    <span className="text-gray-700 font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews Section */}
            <div ref={reviewsRef}>
              <ReviewsSection motorhome={motorhome} />
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingSection 
                motorhome={motorhome} 
                pickupLocations={motorhome.pickupLocations}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={closeGalleryModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            >
              <X className="h-8 w-8" />
            </button>

            {motorhome.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <ChevronLeft className="h-8 w-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 text-white hover:text-gray-300 transition-colors z-10"
                >
                  <ChevronRight className="h-8 w-8" />
                </button>
              </>
            )}

            <img
              src={motorhome.images[selectedImageIndex]}
              alt={`${motorhome.name} ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded">
              {selectedImageIndex + 1} / {motorhome.images.length}
            </div>

            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
              {motorhome.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-white' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${motorhome.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MotorhomeDetailPage;
