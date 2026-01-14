import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Car, 
  Settings, 
  Fuel, 
  Calendar, 
  Ruler, 
  Bath, 
  UtensilsCrossed, 
  Snowflake, 
  Wifi, 
  Navigation, 
  Sun, 
  Camera, 
  ChevronDown,
  ChevronUp,
  RotateCcw
} from "lucide-react";

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void;
  filters: FilterState;
}

export interface FilterState {
  searchQuery: string;
  priceRange: [number, number];
  brands: string[];
  features: string[];
  capacity: string[];
  // Vehicle spec filters
  vehicleTypes: string[];
  transmissions: string[];
  fuelTypes: string[];
  yearRange: [number, number];
  lengthRange: [number, number];
  heightRange: [number, number];
}

const FilterSidebar = ({ onFilterChange, filters }: FilterSidebarProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const brands = ["Toyota", "Mitsubishi", "Isuzu", "Ford", "Nissan"];
  const capacities = ["2 คน", "4 คน", "6 คน", "8+ คน"];
  
  // New filter options
  const vehicleTypes = [
    { id: "camper", label: "Camper" },
    { id: "caravan", label: "Caravan" },
    { id: "motorhome", label: "Motorhome" }
  ];

  const transmissions = [
    { id: "auto", label: "อัตโนมัติ" },
    { id: "manual", label: "ธรรมดา" }
  ];

  const fuelTypes = [
    { id: "diesel", label: "Diesel" },
    { id: "hybrid", label: "Hybrid" },
    { id: "ev", label: "EV" }
  ];

  // Enhanced features with icons
  const features = [
    { id: "ห้องน้ำ", label: "ห้องน้ำ", icon: Bath },
    { id: "ครัว", label: "ครัว", icon: UtensilsCrossed },
    { id: "แอร์ห้องโดยสาร", label: "แอร์ (ห้องโดยสาร)", icon: Snowflake },
    { id: "แอร์พื้นที่พัก", label: "แอร์ (พื้นที่พัก)", icon: Snowflake },
    { id: "WiFi", label: "Wi-Fi", icon: Wifi },
    { id: "GPS", label: "GPS", icon: Navigation },
    { id: "โซล่าเซลล์", label: "Solar Panel", icon: Sun },
    { id: "กล้องถอย", label: "กล้องถอย / Parking sensor", icon: Camera },
    { id: "TV", label: "TV", icon: Camera },
    { id: "ตู้เย็น", label: "ตู้เย็น", icon: UtensilsCrossed },
    { id: "ฝักบัว", label: "ฝักบัว", icon: Bath }
  ];

  const visibleFeatures = showAllFeatures ? features : features.slice(0, 6);
  const hiddenCount = features.length - 6;

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...localFilters, ...newFilters };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleArrayFilterChange = (key: keyof FilterState, value: string, checked: boolean) => {
    const currentArray = localFilters[key] as string[];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);
    updateFilters({ [key]: newArray });
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
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
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="space-y-4">
      {/* Clear All Filters Button */}
      <Button 
        variant="outline" 
        className="w-full flex items-center gap-2"
        onClick={clearAllFilters}
      >
        <RotateCcw className="h-4 w-4" />
        ล้างตัวกรองทั้งหมด
      </Button>

      {/* Price Range */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-4 block">ราคาต่อคืน</Label>
        <Slider
          value={localFilters.priceRange}
          onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
          max={15000}
          min={0}
          step={500}
          className="mb-4"
        />
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground">ราคาเริ่มต้น</Label>
            <div className="flex items-center border rounded-md px-2 py-1.5">
              <span className="text-sm text-muted-foreground mr-1">฿</span>
              <Input
                type="number"
                className="border-0 p-0 h-auto text-sm focus-visible:ring-0"
                value={localFilters.priceRange[0]}
                onChange={(e) => updateFilters({ priceRange: [Number(e.target.value), localFilters.priceRange[1]] })}
              />
            </div>
          </div>
          <span className="text-muted-foreground mt-4">—</span>
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground">สูงสุด</Label>
            <div className="flex items-center border rounded-md px-2 py-1.5">
              <span className="text-sm text-muted-foreground mr-1">฿</span>
              <Input
                type="number"
                className="border-0 p-0 h-auto text-sm focus-visible:ring-0"
                value={localFilters.priceRange[1]}
                onChange={(e) => updateFilters({ priceRange: [localFilters.priceRange[0], Number(e.target.value)] })}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Vehicle Type */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Car className="h-4 w-4 text-primary" />
          <Label className="text-sm font-semibold">ประเภทรถ</Label>
        </div>
        <div className="space-y-2.5">
          {vehicleTypes.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <Checkbox
                id={`vehicleType-${type.id}`}
                checked={localFilters.vehicleTypes.includes(type.id)}
                onCheckedChange={(checked) => handleArrayFilterChange("vehicleTypes", type.id, checked as boolean)}
              />
              <Label htmlFor={`vehicleType-${type.id}`} className="cursor-pointer text-sm font-normal">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Transmission */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="h-4 w-4 text-primary" />
          <Label className="text-sm font-semibold">เกียร์</Label>
        </div>
        <div className="space-y-2.5">
          {transmissions.map((trans) => (
            <div key={trans.id} className="flex items-center space-x-2">
              <Checkbox
                id={`transmission-${trans.id}`}
                checked={localFilters.transmissions.includes(trans.id)}
                onCheckedChange={(checked) => handleArrayFilterChange("transmissions", trans.id, checked as boolean)}
              />
              <Label htmlFor={`transmission-${trans.id}`} className="cursor-pointer text-sm font-normal">
                {trans.label}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Fuel Type */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Fuel className="h-4 w-4 text-primary" />
          <Label className="text-sm font-semibold">เชื้อเพลิง</Label>
        </div>
        <div className="space-y-2.5">
          {fuelTypes.map((fuel) => (
            <div key={fuel.id} className="flex items-center space-x-2">
              <Checkbox
                id={`fuel-${fuel.id}`}
                checked={localFilters.fuelTypes.includes(fuel.id)}
                onCheckedChange={(checked) => handleArrayFilterChange("fuelTypes", fuel.id, checked as boolean)}
              />
              <Label htmlFor={`fuel-${fuel.id}`} className="cursor-pointer text-sm font-normal">
                {fuel.label}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Year Range */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="h-4 w-4 text-primary" />
          <Label className="text-sm font-semibold">ปีรถ</Label>
        </div>
        <Slider
          value={localFilters.yearRange}
          onValueChange={(value) => updateFilters({ yearRange: value as [number, number] })}
          max={2024}
          min={2018}
          step={1}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{localFilters.yearRange[0]}</span>
          <span>{localFilters.yearRange[1]}</span>
        </div>
      </Card>

      {/* Vehicle Size */}
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Ruler className="h-4 w-4 text-primary" />
          <Label className="text-sm font-semibold">ขนาดรถ</Label>
        </div>
        
        {/* Length */}
        <div className="mb-4">
          <Label className="text-xs text-muted-foreground mb-2 block">ความยาว (เมตร)</Label>
          <Slider
            value={localFilters.lengthRange}
            onValueChange={(value) => updateFilters({ lengthRange: value as [number, number] })}
            max={10}
            min={4}
            step={0.5}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{localFilters.lengthRange[0]} ม.</span>
            <span>{localFilters.lengthRange[1]} ม.</span>
          </div>
        </div>

        {/* Height */}
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">ความสูง (เมตร)</Label>
          <Slider
            value={localFilters.heightRange}
            onValueChange={(value) => updateFilters({ heightRange: value as [number, number] })}
            max={4}
            min={2}
            step={0.1}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{localFilters.heightRange[0]} ม.</span>
            <span>{localFilters.heightRange[1]} ม.</span>
          </div>
        </div>
      </Card>

      {/* Brands */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">ยี่ห้อรถ</Label>
        <div className="space-y-2.5">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={localFilters.brands.includes(brand)}
                onCheckedChange={(checked) => handleArrayFilterChange("brands", brand, checked as boolean)}
              />
              <Label htmlFor={`brand-${brand}`} className="cursor-pointer text-sm font-normal">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Capacity */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">ความจุผู้โดยสาร</Label>
        <div className="space-y-2.5">
          {capacities.map((capacity) => (
            <div key={capacity} className="flex items-center space-x-2">
              <Checkbox
                id={`capacity-${capacity}`}
                checked={localFilters.capacity.includes(capacity)}
                onCheckedChange={(checked) => handleArrayFilterChange("capacity", capacity, checked as boolean)}
              />
              <Label htmlFor={`capacity-${capacity}`} className="cursor-pointer text-sm font-normal">
                {capacity}
              </Label>
            </div>
          ))}
        </div>
      </Card>


      {/* Features */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">สิ่งอำนวยความสะดวก</Label>
        <div className="space-y-2.5">
          {visibleFeatures.map((feature) => (
            <div key={feature.id} className="flex items-center space-x-2">
              <Checkbox
                id={`feature-${feature.id}`}
                checked={localFilters.features.includes(feature.id)}
                onCheckedChange={(checked) => handleArrayFilterChange("features", feature.id, checked as boolean)}
              />
              <Label htmlFor={`feature-${feature.id}`} className="cursor-pointer text-sm font-normal flex items-center gap-2">
                <feature.icon className="h-4 w-4 text-muted-foreground" />
                {feature.label}
              </Label>
            </div>
          ))}
        </div>
        
        {features.length > 6 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="w-full mt-3 text-primary"
            onClick={() => setShowAllFeatures(!showAllFeatures)}
          >
            {showAllFeatures ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                ซ่อน
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                + เพิ่มเติม ({hiddenCount})
              </>
            )}
          </Button>
        )}
      </Card>
    </div>
  );
};

export default FilterSidebar;
