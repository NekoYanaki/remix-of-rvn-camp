import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface CampervanFiltersProps {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  vehicleTypes: string[];
  selectedVehicleTypes: string[];
  onVehicleTypeChange: (types: string[]) => void;
  features: string[];
  selectedFeatures: string[];
  onFeaturesChange: (features: string[]) => void;
}

const CampervanFilters = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  vehicleTypes,
  selectedVehicleTypes,
  onVehicleTypeChange,
  features,
  selectedFeatures,
  onFeaturesChange,
}: CampervanFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {/* Start Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-44 justify-start text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? format(startDate, "dd MMM yyyy", { locale: th }) : "วันรับรถ"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={onStartDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* End Date */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-44 justify-start text-left font-normal",
              !endDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {endDate ? format(endDate, "dd MMM yyyy", { locale: th }) : "วันคืนรถ"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={onEndDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>

      {/* Vehicle Type Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="min-w-32">
            Vehicle type
            {selectedVehicleTypes.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {selectedVehicleTypes.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="start">
          <div className="space-y-2">
            {vehicleTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedVehicleTypes.includes(type)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onVehicleTypeChange([...selectedVehicleTypes, type]);
                    } else {
                      onVehicleTypeChange(selectedVehicleTypes.filter((t) => t !== type));
                    }
                  }}
                  className="rounded border-border"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Features Filter */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="min-w-28">
            Features
            {selectedFeatures.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                {selectedFeatures.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56" align="start">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {features.map((feature) => (
              <label key={feature} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedFeatures.includes(feature)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onFeaturesChange([...selectedFeatures, feature]);
                    } else {
                      onFeaturesChange(selectedFeatures.filter((f) => f !== feature));
                    }
                  }}
                  className="rounded border-border"
                />
                <span className="text-sm">{feature}</span>
              </label>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CampervanFilters;
