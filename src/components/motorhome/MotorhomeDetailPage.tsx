import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Car, Images, Sparkles, Star, CarFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroGallery from "./HeroGallery";
import GalleryTabs from "./GalleryTabs";
import HeroHeader from "./HeroHeader";
import QuickSummary from "./QuickSummary";
import PremiumAmenities from "./PremiumAmenities";
import PremiumBookingCard from "./PremiumBookingCard";
import MobileBookingCTA from "./MobileBookingCTA";
import CompatibleCampervans from "./CompatibleCampervans";
import { ReviewsSection } from "./ReviewsSection";
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
      power?: string;
      torque?: string;
      fuelTank?: string;
      fuelConsumption?: string;
      gearbox?: string;
      brakes?: string;
      suspension?: string;
      tires?: string;
      waterTank?: string;
      greyWaterTank?: string;
      gasBottle?: string;
      battery?: string;
      inverter?: string;
    };
    dimensions: {
      length: string;
      width: string;
      height: string;
      wheelbase: string;
      interiorHeight?: string;
      groundClearance?: string;
      grossWeight?: string;
      payload?: string;
      bedSize?: string;
      seatingCapacity?: string;
      diningArea?: string;
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
      maxAge?: number;
      license: string[];
      cancellation: string;
      cancellationFee?: string;
      paymentOptions?: string[];
      paymentMethods?: {
        online: string;
        atPickup: string;
      };
      deposit?: string;
      mileage?: string;
      fuelPolicy?: string;
      lateReturn?: string;
      earlyReturn?: string;
      smoking?: string;
      pets?: string;
      internationalTravel?: string;
      minimumRental?: string;
      pickupTime?: string;
      returnTime?: string;
      requiredDocuments?: string[];
      driverRequirements?: string;
      roadsideAssistance?: string;
      damagePolicy?: string;
    };
    highlights?: string[];
  };
}

const MotorhomeDetailPage = ({ motorhome }: MotorhomeDetailPageProps) => {
  const navigate = useNavigate();
  const highlights = motorhome.highlights || ["Solar panel", "AC"];

  const handleSelectVehicle = () => {
    navigate("/motorhome-summary");
  };

  return (
    <div className="min-h-screen bg-background pb-24 lg:pb-12">
      {/* Minimal Navigation Bar */}
      <div className="bg-background/80 backdrop-blur-md border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/motorhome-results")}
            className="hover:bg-muted -ml-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5" />
            กลับ
          </Button>
          <div className="w-20" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        {/* Header - Vehicle type, brand, model, rating */}
        <div className="py-4">
          <HeroHeader
            vehicleType={motorhome.vehicleType}
            brand={motorhome.brand}
            model={motorhome.model}
            rating={motorhome.rating}
            reviewCount={motorhome.reviewCount}
          />
        </div>

        {/* Hero Gallery - Full Width at Top */}
        <div className="pb-6">
          <HeroGallery images={motorhome.images} name={motorhome.vehicleType} />
        </div>

        {/* Two Column Layout - Content + Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* รายละเอียดรถ - Description first, then icons */}
            <section className="space-y-3">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Car className="h-5 w-5 text-primary" />
                รายละเอียดรถ
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {motorhome.description}
              </p>
              <QuickSummary specs={motorhome.specs} highlights={highlights} />
            </section>

            {/* Gallery Tabs - 360°, Floor Plan, Video */}
            <section>
              <GalleryTabs images={motorhome.images} name={motorhome.vehicleType} />
            </section>

            {/* สิ่งอำนวยความสะดวก (Amenities) */}
            <section className="space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                สิ่งอำนวยความสะดวก
              </h2>
              <PremiumAmenities amenities={motorhome.amenities} maxVisible={8} />
            </section>

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="space-y-2">
              {/* สิ่งที่รวมในแพ็คเกจ (What's Included) */}
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

              {/* ข้อมูลจำเพาะ (Specifications) */}
              <AccordionItem value="specs" className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <span className="font-medium">ข้อมูลจำเพาะ</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* ขนาดภายนอก */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">ขนาดภายนอก</h4>
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
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ระยะฐานล้อ</span>
                          <span>{motorhome.dimensions.wheelbase}</span>
                        </div>
                        {motorhome.dimensions.groundClearance && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ระยะห่างจากพื้น</span>
                            <span>{motorhome.dimensions.groundClearance}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ขนาดภายใน */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">ขนาดภายใน</h4>
                      <div className="space-y-2 text-sm">
                        {motorhome.dimensions.interiorHeight && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ความสูงภายใน</span>
                            <span>{motorhome.dimensions.interiorHeight}</span>
                          </div>
                        )}
                        {motorhome.dimensions.bedSize && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ขนาดเตียง</span>
                            <span>{motorhome.dimensions.bedSize}</span>
                          </div>
                        )}
                        {motorhome.dimensions.seatingCapacity && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ที่นั่ง</span>
                            <span>{motorhome.dimensions.seatingCapacity}</span>
                          </div>
                        )}
                        {motorhome.dimensions.diningArea && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">พื้นที่รับประทานอาหาร</span>
                            <span>{motorhome.dimensions.diningArea}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* น้ำหนัก */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">น้ำหนัก</h4>
                      <div className="space-y-2 text-sm">
                        {motorhome.dimensions.grossWeight && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">น้ำหนักรวม</span>
                            <span>{motorhome.dimensions.grossWeight}</span>
                          </div>
                        )}
                        {motorhome.dimensions.payload && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">น้ำหนักบรรทุก</span>
                            <span>{motorhome.dimensions.payload}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* เครื่องยนต์ */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">เครื่องยนต์</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">รุ่นเครื่องยนต์</span>
                          <span>{motorhome.specs.engine}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">เชื้อเพลิง</span>
                          <span>{motorhome.specs.fuelType}</span>
                        </div>
                        {motorhome.specs.power && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">กำลังสูงสุด</span>
                            <span>{motorhome.specs.power}</span>
                          </div>
                        )}
                        {motorhome.specs.torque && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">แรงบิดสูงสุด</span>
                            <span>{motorhome.specs.torque}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ระบบขับเคลื่อน */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">ระบบขับเคลื่อน</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">ระบบขับเคลื่อน</span>
                          <span>{motorhome.specs.drive}</span>
                        </div>
                        {motorhome.specs.gearbox && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">เกียร์</span>
                            <span>{motorhome.specs.gearbox}</span>
                          </div>
                        )}
                        {motorhome.specs.brakes && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ระบบเบรก</span>
                            <span>{motorhome.specs.brakes}</span>
                          </div>
                        )}
                        {motorhome.specs.tires && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ขนาดยาง</span>
                            <span>{motorhome.specs.tires}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ความจุและระบบไฟ */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">ความจุและระบบไฟ</h4>
                      <div className="space-y-2 text-sm">
                        {motorhome.specs.fuelTank && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ถังน้ำมัน</span>
                            <span>{motorhome.specs.fuelTank}</span>
                          </div>
                        )}
                        {motorhome.specs.fuelConsumption && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">อัตราสิ้นเปลือง</span>
                            <span>{motorhome.specs.fuelConsumption}</span>
                          </div>
                        )}
                        {motorhome.specs.waterTank && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ถังน้ำสะอาด</span>
                            <span>{motorhome.specs.waterTank}</span>
                          </div>
                        )}
                        {motorhome.specs.greyWaterTank && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ถังน้ำเสีย</span>
                            <span>{motorhome.specs.greyWaterTank}</span>
                          </div>
                        )}
                        {motorhome.specs.battery && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">แบตเตอรี่</span>
                            <span>{motorhome.specs.battery}</span>
                          </div>
                        )}
                        {motorhome.specs.inverter && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">อินเวอร์เตอร์</span>
                            <span>{motorhome.specs.inverter}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* เงื่อนไขการเช่า (Terms) */}
              <AccordionItem value="terms" className="border rounded-xl px-4">
                <AccordionTrigger className="hover:no-underline py-4">
                  <span className="font-medium">เงื่อนไขการเช่า</span>
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* คุณสมบัติผู้เช่า */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">คุณสมบัติผู้เช่า</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">อายุ</span>
                          <span>{motorhome.terms.minAge} - {motorhome.terms.maxAge || 70} ปี</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">ใบขับขี่ที่รับ</span>
                          <ul className="mt-1 space-y-1">
                            {motorhome.terms.license.map((lic, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                                <span>{lic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        {motorhome.terms.requiredDocuments && (
                          <div>
                            <span className="text-muted-foreground">เอกสารที่ต้องใช้</span>
                            <ul className="mt-1 space-y-1">
                              {motorhome.terms.requiredDocuments.map((doc, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Check className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                                  <span>{doc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {motorhome.terms.driverRequirements && (
                          <div className="flex flex-col">
                            <span className="text-muted-foreground">ผู้ขับขี่เพิ่มเติม</span>
                            <span className="mt-1">{motorhome.terms.driverRequirements}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* การรับ-คืนรถ */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">การรับ-คืนรถ</h4>
                      <div className="space-y-2 text-sm">
                        {motorhome.terms.minimumRental && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ระยะเวลาเช่าขั้นต่ำ</span>
                            <span>{motorhome.terms.minimumRental}</span>
                          </div>
                        )}
                        {motorhome.terms.pickupTime && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">เวลารับรถ</span>
                            <span>{motorhome.terms.pickupTime}</span>
                          </div>
                        )}
                        {motorhome.terms.returnTime && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">เวลาคืนรถ</span>
                            <span>{motorhome.terms.returnTime}</span>
                          </div>
                        )}
                        {motorhome.terms.lateReturn && (
                          <div className="flex flex-col">
                            <span className="text-muted-foreground">คืนรถล่าช้า</span>
                            <span className="mt-1 text-destructive">{motorhome.terms.lateReturn}</span>
                          </div>
                        )}
                        {motorhome.terms.earlyReturn && (
                          <div className="flex flex-col">
                            <span className="text-muted-foreground">คืนรถก่อนกำหนด</span>
                            <span className="mt-1">{motorhome.terms.earlyReturn}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* นโยบายน้ำมันและระยะทาง */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">น้ำมันและระยะทาง</h4>
                      <div className="space-y-2 text-sm">
                        {motorhome.terms.fuelPolicy && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">นโยบายน้ำมัน</span>
                            <span>{motorhome.terms.fuelPolicy}</span>
                          </div>
                        )}
                        {motorhome.terms.mileage && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ระยะทาง</span>
                            <span>{motorhome.terms.mileage}</span>
                          </div>
                        )}
                        {motorhome.terms.internationalTravel && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">ข้ามพรมแดน</span>
                            <span>{motorhome.terms.internationalTravel}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* กฎระเบียบ */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">กฎระเบียบ</h4>
                      <div className="space-y-2 text-sm">
                        {motorhome.terms.smoking && (
                          <div className="flex flex-col">
                            <span className="text-muted-foreground">การสูบบุหรี่</span>
                            <span className="mt-1 text-destructive">{motorhome.terms.smoking}</span>
                          </div>
                        )}
                        {motorhome.terms.pets && (
                          <div className="flex flex-col">
                            <span className="text-muted-foreground">สัตว์เลี้ยง</span>
                            <span className="mt-1">{motorhome.terms.pets}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* การชำระเงิน */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">การชำระเงิน</h4>
                      <div className="space-y-2 text-sm">
                        {motorhome.terms.deposit && (
                          <div className="flex flex-col">
                            <span className="text-muted-foreground">เงินมัดจำค้ำประกัน</span>
                            <span className="mt-1">{motorhome.terms.deposit}</span>
                          </div>
                        )}
                        {motorhome.terms.paymentOptions && (
                          <div>
                            <span className="text-muted-foreground">ตัวเลือกการชำระ</span>
                            <ul className="mt-1 space-y-1">
                              {motorhome.terms.paymentOptions.map((option, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Check className="h-3.5 w-3.5 text-primary flex-shrink-0 mt-0.5" />
                                  <span>{option}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {motorhome.terms.paymentMethods && (
                          <div className="space-y-2 mt-3">
                            <span className="text-muted-foreground">วิธีชำระเงิน</span>
                            <div className="mt-1 space-y-2">
                              <div className="flex flex-col p-2 bg-secondary/50 rounded-lg">
                                <span className="text-xs text-muted-foreground">ชำระออนไลน์</span>
                                <span className="text-sm">{motorhome.terms.paymentMethods.online}</span>
                              </div>
                              <div className="flex flex-col p-2 bg-secondary/50 rounded-lg">
                                <span className="text-xs text-muted-foreground">ชำระตอนรับรถ (สำหรับยอด 80% ที่เหลือ)</span>
                                <span className="text-sm">{motorhome.terms.paymentMethods.atPickup}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* การยกเลิกและประกัน */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-sm text-primary">การยกเลิกและประกัน</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">นโยบายยกเลิก</span>
                          <span className="mt-1 text-green-600">{motorhome.terms.cancellation}</span>
                        </div>
                        {motorhome.terms.cancellationFee && (
                          <div className="flex flex-col">
                            <span className="mt-1 text-destructive">{motorhome.terms.cancellationFee}</span>
                          </div>
                        )}
                        {motorhome.terms.damagePolicy && (
                          <div className="flex flex-col">
                            <span className="text-muted-foreground">ความรับผิดชอบความเสียหาย</span>
                            <span className="mt-1">{motorhome.terms.damagePolicy}</span>
                          </div>
                        )}
                        {motorhome.terms.roadsideAssistance && (
                          <div className="flex flex-col">
                            <span className="text-muted-foreground">บริการช่วยเหลือฉุกเฉิน</span>
                            <span className="mt-1">{motorhome.terms.roadsideAssistance}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* รีวิว (Reviews) */}
            <section className="space-y-4 pt-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                รีวิวจากผู้เช่า
              </h2>
              <ReviewsSection motorhome={motorhome} maxReviews={3} />
            </section>

            {/* เปรียบเทียบรถคันอื่นๆ (Compare) */}
            <section className="pt-4 pb-8">
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
