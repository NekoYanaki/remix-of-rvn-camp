import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CampervanFilters from "@/components/campervan/CampervanFilters";
import CampervanSortTabs, { SortOption } from "@/components/campervan/CampervanSortTabs";
import CampervanResultCard, { Campervan } from "@/components/campervan/CampervanResultCard";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";

const campervansData: Campervan[] = [
  {
    id: 1,
    name: "Toyata Hilux Revo",
    brand: "Toyota",
    seats: 4,
    beds: 3,
    transmission: "4WD",
    fuelType: "ดีเซล",
    pricePerDay: 5000,
    image: "/lovable-uploads/c1762e4a-0c04-42c9-bb90-72efea7f0c35.png",
    amenities: ["Shower", "Toilet", "Freezer", "Kitchen equipment", "Fridge", "Solar panel", "Air conditioner", "WiFi", "TV", "GPS", "Backup camera"],
  },
  {
    id: 2,
    name: "All-New TRITON",
    brand: "MITSUBISHI",
    seats: 4,
    beds: 3,
    transmission: "4WD",
    fuelType: "ดีเซล",
    pricePerDay: 5000,
    image: "/lovable-uploads/1b98df29-031c-453f-8985-bf9ab03b53a6.png",
    amenities: ["Cooking plate", "Freezer", "Shower", "Toilet", "Fridge", "Solar panel"],
  },
  {
    id: 3,
    name: "MERCEDES-BENZ",
    brand: "MERCEDES-BENZ",
    seats: 4,
    beds: 4,
    transmission: "อัตโนมัติ",
    fuelType: "เบนซิน",
    pricePerDay: 8000,
    image: "/lovable-uploads/39ca8590-7c01-4b61-945b-09c0787d5e19.png",
    amenities: ["Shower", "Toilet", "Freezer", "Kitchen equipment", "Fridge", "Solar panel", "Air conditioner", "WiFi", "TV"],
  },
  {
    id: 4,
    name: "Isuzu D-Max Camper",
    brand: "Isuzu",
    seats: 4,
    beds: 2,
    transmission: "4WD",
    fuelType: "ดีเซล",
    pricePerDay: 4500,
    image: "/lovable-uploads/e4ce7067-7522-45d6-82c0-56a7fb4d8543.png",
    amenities: ["Cooking plate", "Freezer", "Fridge", "Solar panel", "GPS"],
  },
];

const vehicleTypes = ["Camper", "Motorhome", "Caravan"];
const allFeatures = [
  "Shower",
  "Toilet",
  "Freezer",
  "Kitchen equipment",
  "Fridge",
  "Solar panel",
  "Air conditioner",
  "WiFi",
  "TV",
  "GPS",
  "Backup camera",
  "Cooking plate",
];

const CampervanSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state || {};
  const { toast } = useToast();

  const [startDate, setStartDate] = useState<Date | undefined>(
    searchParams.startDate ? new Date(searchParams.startDate) : new Date()
  );
  const [endDate, setEndDate] = useState<Date | undefined>(
    searchParams.endDate ? new Date(searchParams.endDate) : new Date(Date.now() + 86400000)
  );
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>("recommended");

  const filteredAndSortedCampervans = useMemo(() => {
    let result = campervansData.filter((campervan) => {
      // Features filter
      if (selectedFeatures.length > 0) {
        const hasAllFeatures = selectedFeatures.every((feature) =>
          campervan.amenities.includes(feature)
        );
        if (!hasAllFeatures) return false;
      }

      return true;
    });

    // Sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.pricePerDay - b.pricePerDay);
        break;
      case "price-high":
        result.sort((a, b) => b.pricePerDay - a.pricePerDay);
        break;
      case "seats":
        result.sort((a, b) => b.seats - a.seats);
        break;
      case "newest":
        result.sort((a, b) => b.id - a.id);
        break;
      default:
        // recommended - keep original order
        break;
    }

    return result;
  }, [selectedFeatures, sortOption]);

  const handleSelectCampervan = (campervan: Campervan) => {
    toast({
      title: "เลือกรถ Campervan",
      description: `คุณได้เลือก ${campervan.name}`,
    });

    navigate("/motorhome-summary", {
      state: {
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        selectedCampervan: campervan,
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Filters */}
        <CampervanFilters
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          vehicleTypes={vehicleTypes}
          selectedVehicleTypes={selectedVehicleTypes}
          onVehicleTypeChange={setSelectedVehicleTypes}
          features={allFeatures}
          selectedFeatures={selectedFeatures}
          onFeaturesChange={setSelectedFeatures}
        />

        {/* Sort & Results Count */}
        <CampervanSortTabs
          activeSort={sortOption}
          onSortChange={setSortOption}
          resultsCount={filteredAndSortedCampervans.length}
        />

        {/* Results */}
        <div className="space-y-4">
          {filteredAndSortedCampervans.length > 0 ? (
            filteredAndSortedCampervans.map((campervan) => (
              <CampervanResultCard
                key={campervan.id}
                campervan={campervan}
                onSelect={handleSelectCampervan}
              />
            ))
          ) : (
            <div className="text-center py-12 bg-muted rounded-lg border">
              <p className="text-lg text-muted-foreground">
                ไม่พบรถ Campervan ที่ตรงกับเงื่อนไขของคุณ
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                ลองปรับตัวกรองหรือค้นหาใหม่อีกครั้ง
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CampervanSummary;
