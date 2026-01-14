import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

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
}

const FilterSidebar = ({ onFilterChange, filters }: FilterSidebarProps) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const brands = ["Toyota", "Mitsubishi", "Isuzu", "Ford", "Nissan"];
  const features = ["ห้องน้ำ", "ครัว", "แอร์", "WiFi", "TV", "โซล่าเซลล์", "ตู้เย็น", "ฝักบัว"];
  const capacities = ["2 คน", "4 คน", "6 คน", "8+ คน"];

  const updateFilters = (newFilters: Partial<FilterState>) => {
    const updated = { ...localFilters, ...newFilters };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleBrandChange = (brand: string, checked: boolean) => {
    const newBrands = checked
      ? [...localFilters.brands, brand]
      : localFilters.brands.filter((b) => b !== brand);
    updateFilters({ brands: newBrands });
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const newFeatures = checked
      ? [...localFilters.features, feature]
      : localFilters.features.filter((f) => f !== feature);
    updateFilters({ features: newFeatures });
  };

  const handleCapacityChange = (capacity: string, checked: boolean) => {
    const newCapacities = checked
      ? [...localFilters.capacity, capacity]
      : localFilters.capacity.filter((c) => c !== capacity);
    updateFilters({ capacity: newCapacities });
  };

  return (
    <div className="space-y-6">
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

      {/* Brands */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">ยี่ห้อรถ</Label>
        <div className="space-y-2.5">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={localFilters.brands.includes(brand)}
                onCheckedChange={(checked) => handleBrandChange(brand, checked as boolean)}
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
                onCheckedChange={(checked) => handleCapacityChange(capacity, checked as boolean)}
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
          {features.map((feature) => (
            <div key={feature} className="flex items-center space-x-2">
              <Checkbox
                id={`feature-${feature}`}
                checked={localFilters.features.includes(feature)}
                onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
              />
              <Label htmlFor={`feature-${feature}`} className="cursor-pointer text-sm font-normal">
                {feature}
              </Label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default FilterSidebar;
