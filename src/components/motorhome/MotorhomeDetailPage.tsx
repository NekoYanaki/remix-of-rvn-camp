import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Users, BedDouble, Car, Fuel, Settings } from "lucide-react";
import { BookingSection } from "./BookingSection";
import { ReviewsSection } from "./ReviewsSection";
import ProductGallery from "./ProductGallery";
import KeyFeatures from "./KeyFeatures";
import WhatsIncluded from "./WhatsIncluded";
import SpecificationDropdown from "./SpecificationDropdown";
import TermsDropdown from "./TermsDropdown";
import CompatibleCampervans from "./CompatibleCampervans";
import MobileBookingCTA from "./MobileBookingCTA";

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

interface IncludedCategory {
  category: string;
  items: string[];
}

interface MotorhomeDetailPageProps {
  motorhome: {
    id: string;
    name: string;
    model: string;
    brand: string;
    vehicleType: string;
    images: {
      main: string;
      view360?: string;
      productImages: string[];
      floorPlan: {
        day: string;
        night: string;
      };
      video?: string;
    };
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
    includedItems: IncludedCategory[];
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

const MotorhomeDetailPage = ({ motorhome }: MotorhomeDetailPageProps) => {
  const navigate = useNavigate();
  
  // Get available amenities for Key Features
  const keyFeatures = motorhome.amenities
    .filter(amenity => amenity.available)
    .map(amenity => amenity.name);

  const handleSelectVehicle = () => {
    navigate("/campervan-summary");
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-0">
      {/* Navigation Header - Cleaner */}
      <div className="bg-background border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="hover:bg-muted"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg md:text-xl font-bold">{motorhome.vehicleType}</h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-medium">
                    {motorhome.brand}
                  </span>
                  <span className="text-sm text-muted-foreground">{motorhome.model}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{motorhome.rating}</span>
                    <span className="text-muted-foreground">({motorhome.reviewCount})</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-2xl md:text-3xl font-bold text-primary">฿{motorhome.price.toLocaleString()}</span>
              <span className="text-muted-foreground">/วัน</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* Gallery Section */}
        <ProductGallery images={motorhome.images} name={motorhome.vehicleType} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-0">
            {/* Description - Clean, no label */}
            <p className="text-muted-foreground leading-relaxed py-4 text-sm md:text-base">
              {motorhome.description}
            </p>

            {/* Quick Specs - Icon based */}
            <div className="flex flex-wrap gap-4 py-4 border-t">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ผู้โดยสาร</p>
                  <p className="text-sm font-medium">{motorhome.specs.passengers} คน</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <BedDouble className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ที่นอน</p>
                  <p className="text-sm font-medium">{motorhome.specs.beds} เตียง</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Car className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">ประเภท</p>
                  <p className="text-sm font-medium">{motorhome.vehicleType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Settings className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">เกียร์</p>
                  <p className="text-sm font-medium">{motorhome.specs.transmission}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <Fuel className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">เชื้อเพลิง</p>
                  <p className="text-sm font-medium">{motorhome.specs.fuelType}</p>
                </div>
              </div>
            </div>

            {/* Key Features - with +more */}
            <KeyFeatures features={keyFeatures} maxVisible={8} />

            {/* Accordions - collapsed by default */}
            <WhatsIncluded includedItems={motorhome.includedItems} />
            <SpecificationDropdown specs={motorhome.specs} dimensions={motorhome.dimensions} />
            <TermsDropdown terms={motorhome.terms} />

            {/* Compatible Campervans */}
            <div className="py-6 border-t">
              <CompatibleCampervans currentId={motorhome.id} />
            </div>

            {/* Reviews */}
            <div className="py-6 border-t">
              <h3 className="font-semibold text-base mb-4">รีวิวจากผู้เช่า</h3>
              <ReviewsSection motorhome={motorhome} maxReviews={3} />
            </div>
          </div>

          {/* Right Column - Booking Widget (Desktop) */}
          <div className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24">
              <BookingSection 
                motorhome={motorhome} 
                pickupLocations={motorhome.pickupLocations}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA - Fixed bottom */}
      <MobileBookingCTA 
        price={motorhome.price} 
        onSelect={handleSelectVehicle}
      />
    </div>
  );
};

export default MotorhomeDetailPage;
