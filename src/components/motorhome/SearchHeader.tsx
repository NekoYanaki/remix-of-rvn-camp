import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, MapPin, Users, Search } from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface SearchHeaderProps {
  pickupLocation: string;
  departureDate?: Date;
  returnDate?: Date;
  guests: number;
  onPickupLocationChange: (location: string) => void;
  onDepartureDateChange: (date: Date | undefined) => void;
  onReturnDateChange: (date: Date | undefined) => void;
  onGuestsChange: (guests: number) => void;
  onSearch: () => void;
}

const SearchHeader = ({
  pickupLocation,
  departureDate,
  returnDate,
  guests,
  onPickupLocationChange,
  onDepartureDateChange,
  onReturnDateChange,
  onGuestsChange,
  onSearch,
}: SearchHeaderProps) => {
  return (
    <div className="bg-primary text-primary-foreground py-4 px-4 -mx-4 mb-6">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Location */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="สถานที่รับรถ"
              value={pickupLocation}
              onChange={(e) => onPickupLocationChange(e.target.value)}
              className="pl-10 h-12 bg-background text-foreground"
            />
          </div>

          {/* Departure Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-12 min-w-[160px] justify-start gap-2 bg-background text-foreground hover:bg-accent"
              >
                <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                <div className="text-left">
                  {departureDate ? (
                    <>
                      <p className="text-sm font-medium">
                        {format(departureDate, "d MMM yyyy", { locale: th })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(departureDate, "EEEE", { locale: th })}
                      </p>
                    </>
                  ) : (
                    <span className="text-muted-foreground">วันรับรถ</span>
                  )}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={onDepartureDateChange}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Return Date */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-12 min-w-[160px] justify-start gap-2 bg-background text-foreground hover:bg-accent"
              >
                <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                <div className="text-left">
                  {returnDate ? (
                    <>
                      <p className="text-sm font-medium">
                        {format(returnDate, "d MMM yyyy", { locale: th })}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(returnDate, "EEEE", { locale: th })}
                      </p>
                    </>
                  ) : (
                    <span className="text-muted-foreground">วันคืนรถ</span>
                  )}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={onReturnDateChange}
                disabled={(date) => (departureDate ? date <= departureDate : date < new Date())}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          {/* Guests */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="h-12 min-w-[140px] justify-start gap-2 bg-background text-foreground hover:bg-accent"
              >
                <Users className="w-5 h-5 text-muted-foreground" />
                <span>{guests} คน</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48" align="end">
              <div className="space-y-3">
                <p className="text-sm font-medium">จำนวนผู้โดยสาร</p>
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onGuestsChange(Math.max(1, guests - 1))}
                  >
                    -
                  </Button>
                  <span className="font-medium">{guests}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onGuestsChange(Math.min(10, guests + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          {/* Search Button */}
          <Button onClick={onSearch} className="h-12 px-8 bg-green-600 hover:bg-green-700 text-white font-semibold shadow-lg">
            <Search className="w-5 h-5 mr-2" />
            ค้นหา
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
