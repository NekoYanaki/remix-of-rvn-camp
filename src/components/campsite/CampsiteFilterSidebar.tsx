import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RotateCcw, Star } from "lucide-react";

interface CampsiteFilterSidebarProps {
  onFilterChange: (filters: CampsiteFilterState) => void;
  filters: CampsiteFilterState;
}

export interface CampsiteFilterState {
  priceRange: [number, number];
  regions: string[];
  facilities: string[];
  campsiteTypes: string[];
  accommodationTypes: string[];
  motorhomeTypes: string[];
  guestCount: number | null;
  minRating: number | null;
}

const initialFilters: CampsiteFilterState = {
  priceRange: [0, 5000],
  regions: [],
  facilities: [],
  campsiteTypes: [],
  accommodationTypes: [],
  motorhomeTypes: [],
  guestCount: null,
  minRating: null,
};

const CampsiteFilterSidebar = ({ onFilterChange, filters }: CampsiteFilterSidebarProps) => {
  const [localFilters, setLocalFilters] = useState<CampsiteFilterState>(filters);

  const regions = ["ภาคเหนือ", "ภาคกลาง", "ภาคอีสาน", "ภาคใต้", "ภาคตะวันออก", "ภาคตะวันตก"];
  const facilities = ["ห้องน้ำ", "ไฟฟ้า", "น้ำประปา", "ที่จอดรถ", "Wi-Fi", "กิจกรรม"];
  const campsiteTypes = ["ริมน้ำ", "บนภูเขา", "ในป่า", "ชายทะเล", "ทุ่งหญ้า", "สวนผลไม้"];
  const accommodationTypes = ["เต็นท์ส่วนตัว", "เต็นท์ให้เช่า", "บ้านพัก", "กระโจม", "รถบ้าน"];
  const motorhomeTypes = ["Class A", "Class B", "Class C", "Campervan", "Travel Trailer"];
  const guestOptions = [2, 4, 6, 8, 10];
  const ratingOptions = [4.5, 4.0, 3.5, 3.0];

  const updateFilters = (newFilters: Partial<CampsiteFilterState>) => {
    const updated = { ...localFilters, ...newFilters };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleCheckboxChange = (
    key: keyof Pick<CampsiteFilterState, 'regions' | 'facilities' | 'campsiteTypes' | 'accommodationTypes' | 'motorhomeTypes'>,
    value: string,
    checked: boolean
  ) => {
    const currentArray = localFilters[key];
    const newArray = checked
      ? [...currentArray, value]
      : currentArray.filter((item) => item !== value);
    updateFilters({ [key]: newArray });
  };

  const handleClearFilters = () => {
    setLocalFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <div className="space-y-4">
      {/* Clear Filters Button */}
      <Button
        variant="outline"
        onClick={handleClearFilters}
        className="w-full flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-4 h-4" />
        ล้างตัวกรอง
      </Button>

      {/* Price Range */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-4 block">ราคา / คืน</Label>
        <Slider
          value={localFilters.priceRange}
          onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
          max={5000}
          min={0}
          step={100}
          className="mb-4"
        />
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Label className="text-xs text-muted-foreground">ต่ำสุด</Label>
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

      {/* Regions */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">ภูมิภาค</Label>
        <div className="space-y-2.5">
          {regions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox
                id={`region-${region}`}
                checked={localFilters.regions.includes(region)}
                onCheckedChange={(checked) => handleCheckboxChange("regions", region, checked as boolean)}
              />
              <Label htmlFor={`region-${region}`} className="cursor-pointer text-sm font-normal">
                {region}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Accommodation Types */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">ประเภทที่พักที่รองรับ</Label>
        <div className="space-y-2.5">
          {accommodationTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`accommodation-${type}`}
                checked={localFilters.accommodationTypes.includes(type)}
                onCheckedChange={(checked) => handleCheckboxChange("accommodationTypes", type, checked as boolean)}
              />
              <Label htmlFor={`accommodation-${type}`} className="cursor-pointer text-sm font-normal">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Motorhome Types */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">ประเภทรถบ้านที่รองรับ</Label>
        <div className="space-y-2.5">
          {motorhomeTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`motorhome-${type}`}
                checked={localFilters.motorhomeTypes.includes(type)}
                onCheckedChange={(checked) => handleCheckboxChange("motorhomeTypes", type, checked as boolean)}
              />
              <Label htmlFor={`motorhome-${type}`} className="cursor-pointer text-sm font-normal">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Guest Count */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">จำนวนผู้เข้าพัก</Label>
        <div className="space-y-2.5">
          {guestOptions.map((count) => (
            <div key={count} className="flex items-center space-x-2">
              <Checkbox
                id={`guest-${count}`}
                checked={localFilters.guestCount === count}
                onCheckedChange={(checked) => updateFilters({ guestCount: checked ? count : null })}
              />
              <Label htmlFor={`guest-${count}`} className="cursor-pointer text-sm font-normal">
                {count} คนขึ้นไป
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Facilities */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">สิ่งอำนวยความสะดวก</Label>
        <div className="space-y-2.5">
          {facilities.map((facility) => (
            <div key={facility} className="flex items-center space-x-2">
              <Checkbox
                id={`facility-${facility}`}
                checked={localFilters.facilities.includes(facility)}
                onCheckedChange={(checked) => handleCheckboxChange("facilities", facility, checked as boolean)}
              />
              <Label htmlFor={`facility-${facility}`} className="cursor-pointer text-sm font-normal">
                {facility}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Review Rating */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">คะแนนรีวิว</Label>
        <div className="space-y-2.5">
          {ratingOptions.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                id={`rating-${rating}`}
                checked={localFilters.minRating === rating}
                onCheckedChange={(checked) => updateFilters({ minRating: checked ? rating : null })}
              />
              <Label htmlFor={`rating-${rating}`} className="cursor-pointer text-sm font-normal flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                {rating}+ ขึ้นไป
              </Label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CampsiteFilterSidebar;
