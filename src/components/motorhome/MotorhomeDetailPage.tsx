import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PremiumGallery from "./PremiumGallery";
import HeroHeader from "./HeroHeader";
import QuickSummary from "./QuickSummary";
import PremiumAmenities from "./PremiumAmenities";
import PremiumBookingCard from "./PremiumBookingCard";
import MobileBookingCTA from "./MobileBookingCTA";
import CompatibleCampervans from "./CompatibleCampervans";
import { ReviewsSection } from "./ReviewsSection";
import { ChevronDown, Check } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
  const highlights = motorhome.highlights || ["Solar panel", "AC"];

  const handleSelectVehicle = () => {
    navigate("/campervan-summary");
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-12">
      {/* Minimal Navigation Bar */}
      <div className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-muted -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            กลับ
          </Button>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Gallery - Full width for maximum impact */}
        <div className="py-6">
          <PremiumGallery images={motorhome.images} name={motorhome.vehicleType} />
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <HeroHeader
                vehicleType={motorhome.vehicleType}
                brand={motorhome.brand}
                model={motorhome.model}
                rating={motorhome.rating}
                reviewCount={motorhome.reviewCount}
              />
              
              {/* Description - Clean, minimal */}
              <p className="text-muted-foreground leading-relaxed">
                {motorhome.description}
              </p>
            </div>

            {/* Quick Summary */}
            <QuickSummary specs={motorhome.specs} highlights={highlights} />

            {/* Amenities - Reduced, with View All */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold">สิ่งอำนวยความสะดวก</h2>
              <PremiumAmenities amenities={motorhome.amenities} maxVisible={6} />
            </section>

            {/* Accordion Sections - Clean separation */}
            <Accordion type="single" collapsible className="space-y-2">
              {/* What's Included */}
              <AccordionItem value="included" className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <span className="font-medium">สิ่งที่รวมในแพ็คเกจ</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="grid gap-6 md:grid-cols-2">
                    {motorhome.includedItems.map((category, idx) => (
                      <div key={idx} className="space-y-2">
                        <h4 className="font-medium text-sm text-primary">{category.category}</h4>
                        <ul className="space-y-1.5">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Specifications */}
              <AccordionItem value="specs" className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <span className="font-medium">ข้อมูลจำเพาะ</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">ขนาด</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ความยาว</span>
                          <span>{motorhome.dimensions.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ความกว้าง</span>
                          <span>{motorhome.dimensions.width}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ความสูง</span>
                          <span>{motorhome.dimensions.height}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">เครื่องยนต์</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ประเภทเชื้อเพลิง</span>
                          <span>{motorhome.specs.fuelType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ระบบขับเคลื่อน</span>
                          <span>{motorhome.specs.drive}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ขนาดเครื่องยนต์</span>
                          <span>{motorhome.specs.engine}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Terms */}
              <AccordionItem value="terms" className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <span className="font-medium">เงื่อนไขการเช่า</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">อายุขั้นต่ำ</span>
                      <span>{motorhome.terms.minAge} ปี</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ใบขับขี่</span>
                      <span>{motorhome.terms.license.join(", ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">นโยบายยกเลิก</span>
                      <span>{motorhome.terms.cancellation}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">วิธีชำระเงิน</span>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {motorhome.terms.payment.map((method, idx) => (
                          <span key={idx} className="px-3 py-1 bg-secondary rounded-full text-xs">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Reviews */}
            <section className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold">รีวิวจากผู้เช่า</h2>
              <ReviewsSection motorhome={motorhome} maxReviews={3} />
            </section>

            {/* Similar Vehicles */}
            <section className="pt-4">
              <CompatibleCampervans currentId={motorhome.id} />
            </section>
          </div>

          {/* Right Column - Booking Card (Desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-20">
              <PremiumBookingCard
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

      {/* Mobile CTA */}
      <MobileBookingCTA price={motorhome.price} onSelect={handleSelectVehicle} />
    </div>
  );
};

export default MotorhomeDetailPage;
