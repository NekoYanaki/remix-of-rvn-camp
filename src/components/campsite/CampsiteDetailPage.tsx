
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Heart,
  Share2,
} from "lucide-react";
import { CampsiteHeader } from "./CampsiteHeader";
import { CampsiteGallery } from "./CampsiteGallery";
import { CampsiteDetails } from "./CampsiteDetails";
import BookingCartWidget from "./BookingCartWidget";
import { CampsiteReviews } from "./CampsiteReviews";
import { CampsiteLocation } from "./CampsiteLocation";
import { CartItem } from "./ZoneBookingForm";

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

interface AmenityItem {
  name: string;
  images?: string[];
}

interface CampsiteDetailPageProps {
  campsite: {
    id: string;
    name: string;
    images: string[];
    price: number;
    rating: number;
    reviewCount: number;
    description: string;
    location: {
      address: string;
      city: string;
      country: string;
      coordinates: { lat: number; lng: number };
    };
    rules: string[];
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
    host: {
      name: string;
      avatar: string;
      joinedDate: string;
      phone?: string;
      email?: string;
    };
    supportedVehicles?: string[];
    checkIn?: string;
    checkOut?: string;
  };
}

const CampsiteDetailPage = ({ campsite }: CampsiteDetailPageProps) => {
  const navigate = useNavigate();
  
  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('campsite_booking_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('campsite_booking_cart', JSON.stringify(cart));
  }, [cart]);

  const handleAddToCart = (item: CartItem) => {
    setCart(prev => [...prev, item]);
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => prev.filter(item => item.id !== itemId));
  };

  const tabs = [
    { id: "host", label: "เจ้าของที่พัก", sectionId: "section-host" },
    { id: "overview", label: "ภาพรวม", sectionId: "section-overview" },
    { id: "zones", label: "ข้อมูลโซน", sectionId: "section-zones" },
    { id: "location", label: "ตำแหน่ง", sectionId: "section-location" },
    { id: "rules", label: "กฎระเบียบ", sectionId: "section-rules" },
    { id: "reviews", label: "รีวิว", sectionId: "section-reviews" },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-gray-100"
            >
              <ArrowLeft className="h-4 w-4" />
              กลับ
            </Button>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                แชร์
              </Button>
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                บันทึก
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header Section */}
        <CampsiteHeader campsite={campsite} />

        {/* Image Gallery */}
        <CampsiteGallery images={campsite.images} name={campsite.name} />

        {/* Navigation Tabs - Scroll to Section */}
        <div className="sticky top-16 bg-white border-b z-40 -mx-4 px-4 mb-8">
          <div className="flex overflow-x-auto gap-1 py-1 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.sectionId)}
                className="px-4 py-3 text-sm font-medium text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg whitespace-nowrap transition-colors"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - All sections visible */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <CampsiteDetails campsite={campsite} onAddToCart={handleAddToCart} />

            {/* Location Section */}
            <section id="section-location" className="scroll-mt-32">
              <CampsiteLocation campsite={campsite} />
            </section>

            {/* Rules Section */}
            <section id="section-rules" className="bg-white rounded-lg p-6 border scroll-mt-32">
              <h2 className="text-xl font-semibold mb-4">กฎและข้อบังคับ</h2>
              <div className="space-y-3">
                {campsite.rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{rule}</span>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Reviews Section - At Bottom */}
            <section id="section-reviews" className="scroll-mt-32">
              <CampsiteReviews campsite={campsite} />
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-32">
              <BookingCartWidget cart={cart} onRemoveItem={handleRemoveFromCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampsiteDetailPage;
