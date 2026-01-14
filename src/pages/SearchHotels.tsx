import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState, useMemo } from "react";
import CampsiteSearchHeader from "@/components/campsite/CampsiteSearchHeader";
import CampsiteFilterSidebar, { CampsiteFilterState } from "@/components/campsite/CampsiteFilterSidebar";
import CampsiteSortingTabs, { CampsiteSortOption } from "@/components/campsite/CampsiteSortingTabs";
import CampsiteResultCard, { Campsite } from "@/components/campsite/CampsiteResultCard";

const campsitesData: Campsite[] = [
  {
    id: 1,
    name: "ดอยอินทนนท์ แคมป์ไซต์",
    location: "เชียงใหม่",
    region: "ภาคเหนือ",
    type: "บนภูเขา",
    price: 800,
    images: [
      "/lovable-uploads/f13e329f-d1e7-49bf-9c1b-9c22e6b8f9de.png",
      "/lovable-uploads/e24bf5fc-b70c-4b89-a2af-4325db96ce1d.png",
    ],
    facilities: ["ห้องน้ำ", "ไฟฟ้า", "น้ำประปา", "ที่จอดรถ", "ร้านอาหาร"],
    maxGuests: 6,
    rating: 4.8,
    reviewCount: 245,
    description: "แคมป์ไซต์บนยอดดอยอินทนนท์ วิวทะเลหมอก อากาศเย็นสบายตลอดปี เหมาะสำหรับการพักผ่อนหลีกหนีความวุ่นวาย",
  },
  {
    id: 2,
    name: "ริมน้ำ รีสอร์ท แคมป์",
    location: "กาญจนบุรี",
    region: "ภาคตะวันตก",
    type: "ริมน้ำ",
    price: 600,
    images: [
      "/lovable-uploads/e24bf5fc-b70c-4b89-a2af-4325db96ce1d.png",
      "/lovable-uploads/4bcc8b26-96b5-40e3-b140-b6fc6e673ad2.png",
    ],
    facilities: ["ห้องน้ำ", "ไฟฟ้า", "ที่จอดรถ", "กิจกรรมผจญภัย", "WiFi"],
    maxGuests: 4,
    rating: 4.5,
    reviewCount: 189,
    description: "แคมป์ไซต์ริมแม่น้ำแควใหญ่ บรรยากาศร่มรื่น เหมาะสำหรับครอบครัวและกลุ่มเพื่อน มีกิจกรรมล่องแพและพายเรือ",
  },
  {
    id: 3,
    name: "เขาใหญ่ ป่าธรรมชาติ",
    location: "นครราชสีมา",
    region: "ภาคอีสาน",
    type: "ในป่า",
    price: 1200,
    images: [
      "/lovable-uploads/4bcc8b26-96b5-40e3-b140-b6fc6e673ad2.png",
      "/lovable-uploads/da1ee2d7-9a0b-44ca-a085-8ddad30fd28f.png",
    ],
    facilities: ["ห้องน้ำ", "ไฟฟ้า", "น้ำประปา", "ที่จอดรถ", "ร้านอาหาร", "กิจกรรมผจญภัย"],
    maxGuests: 8,
    rating: 4.9,
    reviewCount: 312,
    description: "แคมป์ไซต์ในอุทยานแห่งชาติเขาใหญ่ ใกล้ชิดธรรมชาติ มีโอกาสพบสัตว์ป่า พร้อมกิจกรรมเดินป่าและดูนก",
  },
  {
    id: 4,
    name: "หาดทรายขาว แคมป์ปิ้ง",
    location: "ตราด",
    region: "ภาคตะวันออก",
    type: "ชายทะเล",
    price: 1500,
    images: [
      "/lovable-uploads/da1ee2d7-9a0b-44ca-a085-8ddad30fd28f.png",
      "/lovable-uploads/f13e329f-d1e7-49bf-9c1b-9c22e6b8f9de.png",
    ],
    facilities: ["ห้องน้ำ", "น้ำประปา", "ที่จอดรถ", "กิจกรรมผจญภัย", "สระว่ายน้ำ"],
    maxGuests: 4,
    rating: 4.7,
    reviewCount: 178,
    description: "แคมป์ไซต์ริมหาดทรายขาว น้ำทะเลใส เหมาะสำหรับกิจกรรมทางน้ำ ดำน้ำดูปะการัง และชมพระอาทิตย์ตก",
  },
  {
    id: 5,
    name: "ทุ่งดอกไม้ แคมป์",
    location: "เลย",
    region: "ภาคอีสาน",
    type: "ทุ่งหญ้า",
    price: 500,
    images: [
      "/lovable-uploads/e24bf5fc-b70c-4b89-a2af-4325db96ce1d.png",
    ],
    facilities: ["ห้องน้ำ", "ไฟฟ้า", "ที่จอดรถ"],
    maxGuests: 10,
    rating: 4.4,
    reviewCount: 134,
    description: "แคมป์ไซต์กลางทุ่งดอกไม้ วิวภูเขาสวยงาม เหมาะสำหรับถ่ายรูปและชมดาวยามค่ำคืน อากาศเย็นสบาย",
  },
];

const SearchHotels = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [location, setLocation] = useState("");
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [guests, setGuests] = useState(2);

  const [filters, setFilters] = useState<CampsiteFilterState>({
    priceRange: [0, 5000],
    regions: [],
    facilities: [],
    campsiteTypes: [],
  });

  const [sortOption, setSortOption] = useState<CampsiteSortOption>("recommended");

  const calculateTotalDays = () => {
    if (!checkInDate || !checkOutDate) return 1;
    const diff = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const totalDays = calculateTotalDays();

  const filteredAndSortedCampsites = useMemo(() => {
    let result = campsitesData.filter((campsite) => {
      // Location search
      if (location) {
        const query = location.toLowerCase();
        if (!campsite.name.toLowerCase().includes(query) && 
            !campsite.location.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Price filter
      if (campsite.price < filters.priceRange[0] || campsite.price > filters.priceRange[1]) {
        return false;
      }

      // Region filter
      if (filters.regions.length > 0 && !filters.regions.includes(campsite.region)) {
        return false;
      }

      // Facilities filter
      if (filters.facilities.length > 0) {
        const hasAllFacilities = filters.facilities.every((facility) =>
          campsite.facilities.includes(facility)
        );
        if (!hasAllFacilities) return false;
      }

      // Campsite type filter
      if (filters.campsiteTypes.length > 0 && !filters.campsiteTypes.includes(campsite.type)) {
        return false;
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
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // recommended - sort by rating
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [location, filters, sortOption]);

  const handleSelectCampsite = (campsite: Campsite) => {
    if (!checkInDate || !checkOutDate) {
      toast({
        title: "กรุณาเลือกวันที่",
        description: "กรุณาเลือกวันเช็คอินและเช็คเอาท์ก่อนจองแคมป์ไซต์",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "เลือกแคมป์ไซต์",
      description: `คุณได้เลือก ${campsite.name} กำลังพาคุณไปยังหน้ารายละเอียด...`,
    });

    navigate("/book-campsite", {
      state: {
        selectedCampsite: campsite,
        checkInDate: checkInDate?.toISOString(),
        checkOutDate: checkOutDate?.toISOString(),
        guests,
        totalDays,
        totalPrice: campsite.price * totalDays,
      },
    });
  };

  const handleViewDetails = (campsite: Campsite) => {
    navigate(`/campsite/${campsite.id}`, {
      state: {
        selectedCampsite: campsite,
        checkInDate: checkInDate?.toISOString(),
        checkOutDate: checkOutDate?.toISOString(),
        guests,
      },
    });
  };

  const handleSearch = () => {
    toast({
      title: "กำลังค้นหา",
      description: "กำลังค้นหาแคมป์ไซต์ตามเงื่อนไขของคุณ...",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />
      
      {/* Search Header */}
      <CampsiteSearchHeader
        location={location}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        guests={guests}
        onLocationChange={setLocation}
        onCheckInDateChange={setCheckInDate}
        onCheckOutDateChange={setCheckOutDate}
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
          {/* Sidebar Filters - Sticky */}
          <aside className="w-full lg:w-72 flex-shrink-0">
            <div className="lg:sticky lg:top-4">
              <CampsiteFilterSidebar filters={filters} onFilterChange={setFilters} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sorting Tabs */}
            <CampsiteSortingTabs
              activeSort={sortOption}
              onSortChange={setSortOption}
              resultsCount={filteredAndSortedCampsites.length}
            />

            {/* Results */}
            <div className="space-y-4">
              {filteredAndSortedCampsites.length > 0 ? (
                filteredAndSortedCampsites.map((campsite) => (
                  <CampsiteResultCard
                    key={campsite.id}
                    campsite={campsite}
                    totalDays={totalDays}
                    onSelect={handleSelectCampsite}
                    onViewDetails={handleViewDetails}
                  />
                ))
              ) : (
                <div className="text-center py-12 bg-background rounded-lg border">
                  <p className="text-lg text-muted-foreground">ไม่พบแคมป์ไซต์ที่ตรงกับเงื่อนไขของคุณ</p>
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

export default SearchHotels;
