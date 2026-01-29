import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import ProductGallery from "./ProductGallery";
import HeroHeader from "./HeroHeader";
import QuickSummary from "./QuickSummary";
import KeyFeatures from "./KeyFeatures";
import WhatsIncluded from "./WhatsIncluded";
import SpecificationDropdown from "./SpecificationDropdown";
import TermsDropdown from "./TermsDropdown";
import CompatibleCampervans from "./CompatibleCampervans";
import { ReviewsSection } from "./ReviewsSection";
import StickyBookingBox from "./StickyBookingBox";
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
    bestFor?: string;
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
    highlights?: string[];
  };
}

const MotorhomeDetailPage = ({ motorhome }: MotorhomeDetailPageProps) => {
  const navigate = useNavigate();

  // Get available amenities for Key Features
  const keyFeatures = motorhome.amenities
    .filter((amenity) => amenity.available)
    .map((amenity) => amenity.name);

  // Get highlights for quick summary
  const highlights = motorhome.highlights || ["Solar panel", "AC"];

  const handleSelectVehicle = () => {
    navigate("/campervan-summary");
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      {/* Minimal Navigation */}
      <div className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-muted -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            ย้อนกลับ
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* Hero Header */}
        <HeroHeader
          vehicleType={motorhome.vehicleType}
          brand={motorhome.brand}
          model={motorhome.model}
          rating={motorhome.rating}
          reviewCount={motorhome.reviewCount}
        />

        {/* Gallery - Full width for maximum impact */}
        <div className="mt-4">
          <ProductGallery images={motorhome.images} name={motorhome.vehicleType} />
        </div>

        {/* Two Column Layout - Content + Booking Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-8 space-y-5">
            {/* Description */}
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {motorhome.description}
            </p>

            {/* Quick Summary - Icon Chips */}
            <QuickSummary specs={motorhome.specs} highlights={highlights} />

            {/* Key Features */}
            <KeyFeatures features={keyFeatures} maxVisible={10} />

            {/* Collapsible Sections */}
            <div className="space-y-0">
              <WhatsIncluded includedItems={motorhome.includedItems} />
              <SpecificationDropdown
                specs={motorhome.specs}
                dimensions={motorhome.dimensions}
              />
              <TermsDropdown terms={motorhome.terms} />
            </div>

            {/* Reviews */}
            <div className="py-5 border-t">
              <h3 className="font-semibold text-base mb-4">รีวิวจากผู้เช่า</h3>
              <ReviewsSection motorhome={motorhome} maxReviews={3} />
            </div>

            {/* Compatible Campervans */}
            <CompatibleCampervans currentId={motorhome.id} />
          </div>

          {/* Right Column - Booking Box (Desktop) */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-20">
              <StickyBookingBox
                pricing={motorhome.pricing}
                rating={motorhome.rating}
                reviewCount={motorhome.reviewCount}
                pickupLocations={motorhome.pickupLocations}
                cancellationPolicy={motorhome.terms.cancellation}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile CTA - Fixed bottom */}
      <MobileBookingCTA price={motorhome.price} onSelect={handleSelectVehicle} />
    </div>
  );
};

export default MotorhomeDetailPage;
