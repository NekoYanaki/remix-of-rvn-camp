import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star } from "lucide-react";
import { BookingSection } from "./BookingSection";
import { ReviewsSection } from "./ReviewsSection";
import ProductGallery from "./ProductGallery";
import VehicleSpecs from "./VehicleSpecs";
import KeyFeatures from "./KeyFeatures";
import WhatsIncluded from "./WhatsIncluded";
import SpecificationDropdown from "./SpecificationDropdown";
import TermsDropdown from "./TermsDropdown";
import CompatibleCampervans from "./CompatibleCampervans";

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
                className="flex items-center gap-2 hover:bg-muted"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                {/* 1. Product Introduction - Show vehicle type */}
                <h1 className="text-xl font-bold">{motorhome.vehicleType}</h1>
                <div className="flex items-center gap-2">
                  {/* 2. Tag shows brand name */}
                  <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-xs font-medium">
                    {motorhome.brand}
                  </span>
                  <span className="text-sm text-muted-foreground">{motorhome.model}</span>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{motorhome.rating}</span>
                    <span className="text-muted-foreground">({motorhome.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold">฿{motorhome.price.toLocaleString()}</span>
              <span className="text-muted-foreground">/วัน</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* 3. Gallery Section */}
        <ProductGallery images={motorhome.images} name={motorhome.vehicleType} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-0">
            {/* 4. Product Description */}
            <div className="py-6">
              <h3 className="font-semibold text-lg mb-3">Product Description</h3>
              <p className="text-muted-foreground leading-relaxed">{motorhome.description}</p>
            </div>

            {/* 5. ข้อมูลจำเพาะ */}
            <VehicleSpecs specs={motorhome.specs} />

            {/* 6. Key Features */}
            <KeyFeatures features={keyFeatures} />

            {/* 7. What's Included (Dropdown) */}
            <WhatsIncluded includedItems={motorhome.includedItems} />

            {/* 8. Specification (Dropdown) */}
            <SpecificationDropdown specs={motorhome.specs} dimensions={motorhome.dimensions} />

            {/* 9. Terms and Conditions (Dropdown) */}
            <TermsDropdown terms={motorhome.terms} />

            {/* 10. Compatible Campervans */}
            <CompatibleCampervans currentId={motorhome.id} />

            {/* 11. Reviews */}
            <div className="py-6 border-t">
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
    </div>
  );
};

export default MotorhomeDetailPage;
