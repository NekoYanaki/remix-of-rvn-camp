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
import { Check } from "lucide-react";
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
    <div className="min-h-screen bg-background pb-28 lg:pb-16">
      {/* Minimal Navigation Bar - More subtle */}
      <div className="bg-background/95 backdrop-blur-lg border-b border-border/30 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="hover:bg-muted/50 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">กลับ</span>
          </Button>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Hero Gallery - Full width, generous spacing */}
        <div className="py-8 md:py-10">
          <PremiumGallery images={motorhome.images} name={motorhome.vehicleType} />
        </div>

        {/* Two Column Layout - More breathing room */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-12">
            {/* Header Section */}
            <div className="space-y-6">
              <HeroHeader
                vehicleType={motorhome.vehicleType}
                brand={motorhome.brand}
                model={motorhome.model}
                rating={motorhome.rating}
                reviewCount={motorhome.reviewCount}
              />
              
              {/* Description - More relaxed line height */}
              <p className="text-muted-foreground leading-loose text-base">
                {motorhome.description}
              </p>
            </div>

            {/* Quick Summary - More space */}
            <div className="py-2">
              <QuickSummary specs={motorhome.specs} highlights={highlights} />
            </div>

            {/* Amenities */}
            <section className="space-y-5">
              <h2 className="text-xl font-medium text-foreground/90">สิ่งอำนวยความสะดวก</h2>
              <PremiumAmenities amenities={motorhome.amenities} maxVisible={6} />
            </section>

            {/* Accordion Sections - Softer styling */}
            <Accordion type="single" collapsible className="space-y-3">
              {/* What's Included */}
              <AccordionItem value="included" className="border border-border/40 rounded-2xl px-5">
                <AccordionTrigger className="hover:no-underline py-5">
                  <span className="font-medium text-foreground/90">สิ่งที่รวมในแพ็คเกจ</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="grid gap-8 md:grid-cols-2">
                    {motorhome.includedItems.map((category, idx) => (
                      <div key={idx} className="space-y-3">
                        <h4 className="font-medium text-sm text-primary/80">{category.category}</h4>
                        <ul className="space-y-2">
                          {category.items.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                              <Check className="h-4 w-4 text-primary/60 flex-shrink-0 mt-0.5" />
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
              <AccordionItem value="specs" className="border border-border/40 rounded-2xl px-5">
                <AccordionTrigger className="hover:no-underline py-5">
                  <span className="font-medium text-foreground/90">ข้อมูลจำเพาะ</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-primary/80">ขนาด</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ความยาว</span>
                          <span className="text-foreground/80">{motorhome.dimensions.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ความกว้าง</span>
                          <span className="text-foreground/80">{motorhome.dimensions.width}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ความสูง</span>
                          <span className="text-foreground/80">{motorhome.dimensions.height}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-primary/80">เครื่องยนต์</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">เชื้อเพลิง</span>
                          <span className="text-foreground/80">{motorhome.specs.fuelType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ระบบขับเคลื่อน</span>
                          <span className="text-foreground/80">{motorhome.specs.drive}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ขนาดเครื่องยนต์</span>
                          <span className="text-foreground/80">{motorhome.specs.engine}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Terms */}
              <AccordionItem value="terms" className="border border-border/40 rounded-2xl px-5">
                <AccordionTrigger className="hover:no-underline py-5">
                  <span className="font-medium text-foreground/90">เงื่อนไขการเช่า</span>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">อายุขั้นต่ำ</span>
                      <span className="text-foreground/80">{motorhome.terms.minAge} ปี</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">ใบขับขี่</span>
                      <span className="text-foreground/80">{motorhome.terms.license.join(", ")}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">นโยบายยกเลิก</span>
                      <span className="text-foreground/80">{motorhome.terms.cancellation}</span>
                    </div>
                    <div className="pt-2">
                      <span className="text-muted-foreground">วิธีชำระเงิน</span>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {motorhome.terms.payment.map((method, idx) => (
                          <span key={idx} className="px-4 py-1.5 bg-muted/40 rounded-full text-xs text-foreground/70">
                            {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Reviews - More space */}
            <section className="space-y-6 pt-4">
              <h2 className="text-xl font-medium text-foreground/90">รีวิวจากผู้เช่า</h2>
              <ReviewsSection motorhome={motorhome} maxReviews={3} />
            </section>

            {/* Similar Vehicles */}
            <section className="pt-6 pb-4">
              <CompatibleCampervans currentId={motorhome.id} />
            </section>
          </div>

          {/* Right Column - Booking Card (Desktop) */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24">
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
