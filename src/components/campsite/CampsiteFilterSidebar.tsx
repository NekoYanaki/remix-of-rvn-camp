import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card } from "@/components/ui/card";

interface CampsiteFilterSidebarProps {
  onFilterChange: (filters: CampsiteFilterState) => void;
  filters: CampsiteFilterState;
}

export interface CampsiteFilterState {
  priceRange: [number, number];
  regions: string[];
  facilities: string[];
  campsiteTypes: string[];
}

const CampsiteFilterSidebar = ({ onFilterChange, filters }: CampsiteFilterSidebarProps) => {
  const [localFilters, setLocalFilters] = useState<CampsiteFilterState>(filters);

  const regions = ["ภาคเหนือ", "ภาคกลาง", "ภาคใต้", "ภาคอีสาน", "ภาคตะวันออก", "ภาคตะวันตก"];
  const facilities = ["ห้องน้ำ", "ไฟฟ้า", "น้ำประปา", "WiFi", "ร้านอาหาร", "ที่จอดรถ", "กิจกรรมผจญภัย", "สระว่ายน้ำ"];
  const campsiteTypes = ["ริมน้ำ", "บนภูเขา", "ในป่า", "ชายทะเล", "ทุ่งหญ้า", "สวนผลไม้"];

  const updateFilters = (newFilters: Partial<CampsiteFilterState>) => {
    const updated = { ...localFilters, ...newFilters };
    setLocalFilters(updated);
    onFilterChange(updated);
  };

  const handleRegionChange = (region: string, checked: boolean) => {
    const newRegions = checked
      ? [...localFilters.regions, region]
      : localFilters.regions.filter((r) => r !== region);
    updateFilters({ regions: newRegions });
  };

  const handleFacilityChange = (facility: string, checked: boolean) => {
    const newFacilities = checked
      ? [...localFilters.facilities, facility]
      : localFilters.facilities.filter((f) => f !== facility);
    updateFilters({ facilities: newFacilities });
  };

  const handleTypeChange = (type: string, checked: boolean) => {
    const newTypes = checked
      ? [...localFilters.campsiteTypes, type]
      : localFilters.campsiteTypes.filter((t) => t !== type);
    updateFilters({ campsiteTypes: newTypes });
  };

  return (
    <div className="space-y-6">
      {/* Price Range */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-4 block">ราคาต่อคืน</Label>
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

      {/* Regions */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">ภูมิภาค</Label>
        <div className="space-y-2.5">
          {regions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox
                id={`region-${region}`}
                checked={localFilters.regions.includes(region)}
                onCheckedChange={(checked) => handleRegionChange(region, checked as boolean)}
              />
              <Label htmlFor={`region-${region}`} className="cursor-pointer text-sm font-normal">
                {region}
              </Label>
            </div>
          ))}
        </div>
      </Card>

      {/* Campsite Types */}
      <Card className="p-4">
        <Label className="text-sm font-semibold mb-3 block">ประเภทแคมป์ไซต์</Label>
        <div className="space-y-2.5">
          {campsiteTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={`type-${type}`}
                checked={localFilters.campsiteTypes.includes(type)}
                onCheckedChange={(checked) => handleTypeChange(type, checked as boolean)}
              />
              <Label htmlFor={`type-${type}`} className="cursor-pointer text-sm font-normal">
                {type}
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
                onCheckedChange={(checked) => handleFacilityChange(facility, checked as boolean)}
              />
              <Label htmlFor={`facility-${facility}`} className="cursor-pointer text-sm font-normal">
                {facility}
              </Label>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CampsiteFilterSidebar;
