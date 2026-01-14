import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FilterSidebar, { FilterState } from "@/components/motorhome/FilterSidebar";
import SortingTabs, { SortOption } from "@/components/motorhome/SortingTabs";
import MotorhomeResultCard, { Motorhome } from "@/components/motorhome/MotorhomeResultCard";
import SearchHeader from "@/components/motorhome/SearchHeader";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";

const motorhomesData: Motorhome[] = [
  {
    id: 1,
    name: "Toyota Hilux Revo Camper Premium",
    brand: "Toyota",
    model: "Hilux Revo",
    seats: 4,
    price: 4500,
    originalPrice: 5500,
    images: [
      "/lovable-uploads/c1762e4a-0c04-42c9-bb90-72efea7f0c35.png",
      "/lovable-uploads/1b98df29-031c-453f-8985-bf9ab03b53a6.png",
    ],
    amenities: ["ห้องน้ำ", "โซล่าเซลล์", "ครัว", "แอร์ห้องโดยสาร", "WiFi", "TV", "ตู้เย็น", "GPS", "กล้องถอย"],
    bedSize: "Queen",
    transmission: "ออโต้",
    fuelType: "ดีเซล",
    rating: 4.8,
    reviewCount: 156,
    pickupLocation: "สนามบินสุวรรณภูมิ",
    dropoffLocation: "สนามบินเชียงใหม่",
    vehicleType: "camper",
    transmissionType: "auto",
    fuelTypeCode: "diesel",
    year: 2023,
    length: 5.8,
    height: 2.8,
    bedType: "queen",
  },
  {
    id: 2,
    name: "Toyota Hilux Champ Camper",
    brand: "Toyota",
    model: "Hilux Champ",
    seats: 6,
    price: 7500,
    images: [
      "/lovable-uploads/1b98df29-031c-453f-8985-bf9ab03b53a6.png",
      "/lovable-uploads/c1762e4a-0c04-42c9-bb90-72efea7f0c35.png",
    ],
    amenities: ["ครัว", "ห้องน้ำ", "แอร์พื้นที่พัก", "WiFi", "โซล่าเซลล์", "TV", "ฝักบัว", "GPS"],
    bedSize: "King",
    transmission: "ออโต้",
    fuelType: "ดีเซล",
    rating: 4.9,
    reviewCount: 89,
    pickupLocation: "สนามบินดอนเมือง",
    dropoffLocation: "สนามบินภูเก็ต",
    vehicleType: "motorhome",
    transmissionType: "auto",
    fuelTypeCode: "diesel",
    year: 2024,
    length: 7.2,
    height: 3.2,
    bedType: "queen",
  },
  {
    id: 3,
    name: "Mitsubishi Triton Camper",
    brand: "Mitsubishi",
    model: "Triton",
    seats: 2,
    price: 3500,
    originalPrice: 4200,
    images: [
      "/lovable-uploads/39ca8590-7c01-4b61-945b-09c0787d5e19.png",
    ],
    amenities: ["ครัว", "ห้องน้ำ", "แอร์ห้องโดยสาร", "โซล่าเซลล์"],
    bedSize: "Double",
    transmission: "เกียร์ธรรมดา",
    fuelType: "ดีเซล",
    rating: 4.5,
    reviewCount: 67,
    pickupLocation: "สนามบินสุวรรณภูมิ",
    dropoffLocation: "สนามบินกระบี่",
    vehicleType: "camper",
    transmissionType: "manual",
    fuelTypeCode: "diesel",
    year: 2021,
    length: 5.2,
    height: 2.5,
    bedType: "double",
  },
  {
    id: 4,
    name: "Isuzu D-Max Camper Deluxe",
    brand: "Isuzu",
    model: "D-Max",
    seats: 4,
    price: 6000,
    images: [
      "/lovable-uploads/e4ce7067-7522-45d6-82c0-56a7fb4d8543.png",
    ],
    amenities: ["ครัว", "ห้องน้ำ", "แอร์ห้องโดยสาร", "แอร์พื้นที่พัก", "WiFi", "TV", "ตู้เย็น", "ฝักบัว", "กล้องถอย"],
    bedSize: "Queen",
    transmission: "ออโต้",
    fuelType: "ดีเซล",
    rating: 4.7,
    reviewCount: 124,
    pickupLocation: "สนามบินดอนเมือง",
    dropoffLocation: "สนามบินเชียงใหม่",
    vehicleType: "motorhome",
    transmissionType: "auto",
    fuelTypeCode: "diesel",
    year: 2022,
    length: 6.5,
    height: 3.0,
    bedType: "queen",
  },
  {
    id: 5,
    name: "Ford Ranger Camper Sport",
    brand: "Ford",
    model: "Ranger",
    seats: 4,
    price: 5500,
    originalPrice: 6500,
    images: [
      "/lovable-uploads/c1762e4a-0c04-42c9-bb90-72efea7f0c35.png",
    ],
    amenities: ["ครัว", "แอร์ห้องโดยสาร", "WiFi", "โซล่าเซลล์", "ตู้เย็น", "GPS"],
    bedSize: "Queen",
    transmission: "ออโต้",
    fuelType: "ไฮบริด",
    rating: 4.6,
    reviewCount: 98,
    pickupLocation: "สนามบินสุวรรณภูมิ",
    dropoffLocation: "สนามบินสุวรรณภูมิ",
    vehicleType: "camper",
    transmissionType: "auto",
    fuelTypeCode: "hybrid",
    year: 2023,
    length: 5.5,
    height: 2.7,
    bedType: "queen",
  },
  {
    id: 6,
    name: "Nissan Navara Caravan",
    brand: "Nissan",
    model: "Navara",
    seats: 4,
    price: 4800,
    images: [
      "/lovable-uploads/1b98df29-031c-453f-8985-bf9ab03b53a6.png",
    ],
    amenities: ["ครัว", "ห้องน้ำ", "แอร์พื้นที่พัก", "WiFi", "GPS", "กล้องถอย"],
    bedSize: "Double",
    transmission: "ออโต้",
    fuelType: "ดีเซล",
    rating: 4.4,
    reviewCount: 56,
    pickupLocation: "สนามบินดอนเมือง",
    dropoffLocation: "สนามบินดอนเมือง",
    vehicleType: "caravan",
    transmissionType: "auto",
    fuelTypeCode: "diesel",
    year: 2020,
    length: 6.0,
    height: 2.9,
    bedType: "double",
  },
];

const MotorhomeResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state || {};
  const { toast } = useToast();

  const [pickupLocation, setPickupLocation] = useState(searchParams.pickupLocation || "");
  const [departureDate, setDepartureDate] = useState<Date | undefined>(
    searchParams.departureDate ? new Date(searchParams.departureDate) : undefined
  );
  const [returnDate, setReturnDate] = useState<Date | undefined>(
    searchParams.returnDate ? new Date(searchParams.returnDate) : undefined
  );
  const [guests, setGuests] = useState(searchParams.guests || 2);

const [filters, setFilters] = useState<FilterState>({
    searchQuery: "",
    priceRange: [0, 15000],
    brands: [],
    features: [],
    capacity: [],
    vehicleTypes: [],
    transmissions: [],
    fuelTypes: [],
    yearRange: [2018, 2024],
    lengthRange: [4, 10],
    heightRange: [2, 4],
  });

  const [sortOption, setSortOption] = useState<SortOption>("recommended");

  const calculateTotalDays = () => {
    if (!departureDate || !returnDate) return 1;
    const diff = Math.ceil((returnDate.getTime() - departureDate.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const totalDays = calculateTotalDays();

const filteredAndSortedMotorhomes = useMemo(() => {
    let result = motorhomesData.filter((motorhome) => {
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        if (!motorhome.name.toLowerCase().includes(query) && 
            !motorhome.brand.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Price filter
      if (motorhome.price < filters.priceRange[0] || motorhome.price > filters.priceRange[1]) {
        return false;
      }

      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(motorhome.brand)) {
        return false;
      }

      // Features filter
      if (filters.features.length > 0) {
        const hasAllFeatures = filters.features.every((feature) =>
          motorhome.amenities.includes(feature)
        );
        if (!hasAllFeatures) return false;
      }

      // Capacity filter
      if (filters.capacity.length > 0) {
        const capacityMatch = filters.capacity.some((cap) => {
          if (cap === "2 คน") return motorhome.seats === 2;
          if (cap === "4 คน") return motorhome.seats === 4;
          if (cap === "6 คน") return motorhome.seats === 6;
          if (cap === "8+ คน") return motorhome.seats >= 8;
          return false;
        });
        if (!capacityMatch) return false;
      }

      // Vehicle type filter
      if (filters.vehicleTypes.length > 0 && motorhome.vehicleType) {
        if (!filters.vehicleTypes.includes(motorhome.vehicleType)) {
          return false;
        }
      }

      // Transmission filter
      if (filters.transmissions.length > 0 && motorhome.transmissionType) {
        if (!filters.transmissions.includes(motorhome.transmissionType)) {
          return false;
        }
      }

      // Fuel type filter
      if (filters.fuelTypes.length > 0 && motorhome.fuelTypeCode) {
        if (!filters.fuelTypes.includes(motorhome.fuelTypeCode)) {
          return false;
        }
      }

      // Year filter
      if (motorhome.year) {
        if (motorhome.year < filters.yearRange[0] || motorhome.year > filters.yearRange[1]) {
          return false;
        }
      }

      // Length filter
      if (motorhome.length) {
        if (motorhome.length < filters.lengthRange[0] || motorhome.length > filters.lengthRange[1]) {
          return false;
        }
      }

      // Height filter
      if (motorhome.height) {
        if (motorhome.height < filters.heightRange[0] || motorhome.height > filters.heightRange[1]) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "capacity":
        result.sort((a, b) => b.seats - a.seats);
        break;
      default:
        // recommended - sort by rating and has discount
        result.sort((a, b) => {
          const aScore = a.rating + (a.originalPrice ? 0.5 : 0);
          const bScore = b.rating + (b.originalPrice ? 0.5 : 0);
          return bScore - aScore;
        });
    }

    return result;
  }, [filters, sortOption]);

  const handleSelectMotorhome = (motorhome: Motorhome) => {
    toast({
      title: "เลือกรถ Motorhome",
      description: `คุณได้เลือก ${motorhome.name} กำลังพาคุณไปยังหน้ารายละเอียด...`,
    });

    navigate("/motorhome-calculator", {
      state: {
        pickupLocation,
        departureDate: departureDate?.toISOString(),
        returnDate: returnDate?.toISOString(),
        guests,
        selectedMotorhome: motorhome,
        totalDays,
        totalPrice: motorhome.price * totalDays,
      },
    });
  };

  const handleViewDetails = (motorhome: Motorhome) => {
    navigate(`/motorhome/${motorhome.id}`, {
      state: {
        pickupLocation,
        departureDate: departureDate?.toISOString(),
        returnDate: returnDate?.toISOString(),
        guests,
        selectedMotorhome: motorhome,
      },
    });
  };

  const handleSearch = () => {
    toast({
      title: "กำลังค้นหา",
      description: "กำลังค้นหารถ Motorhome ตามเงื่อนไขของคุณ...",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      {/* Search Header */}
      <SearchHeader
        pickupLocation={pickupLocation}
        departureDate={departureDate}
        returnDate={returnDate}
        guests={guests}
        onPickupLocationChange={setPickupLocation}
        onDepartureDateChange={setDepartureDate}
        onReturnDateChange={setReturnDate}
        onGuestsChange={setGuests}
        onSearch={handleSearch}
      />

      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          กลับไปหน้าก่อนหน้า
        </Button>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters - Scrolls with content */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div>
              <FilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sorting Tabs */}
            <SortingTabs
              activeSort={sortOption}
              onSortChange={setSortOption}
              resultsCount={filteredAndSortedMotorhomes.length}
            />

            {/* Results */}
            <div className="space-y-4">
              {filteredAndSortedMotorhomes.length > 0 ? (
                filteredAndSortedMotorhomes.map((motorhome) => (
                  <MotorhomeResultCard
                    key={motorhome.id}
                    motorhome={motorhome}
                    totalDays={totalDays}
                    onSelect={handleSelectMotorhome}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-background rounded-lg border">
                  <p className="text-lg text-muted-foreground">ไม่พบรถ Motorhome ที่ตรงกับเงื่อนไขของคุณ</p>
                  <p className="text-sm text-muted-foreground mt-2">ลองปรับตัวกรองหรือค้นหาใหม่อีกครั้ง</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MotorhomeResults;
