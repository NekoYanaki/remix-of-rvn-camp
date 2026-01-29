import React from "react";
import { ChevronDown, Ruler, Move, ArrowUpDown, ArrowLeftRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface SpecificationDropdownProps {
  specs: {
    passengers: number;
    beds: number;
    transmission: string;
    fuelType: string;
    year: number;
    drive: string;
    engine: string;
  };
  dimensions: {
    length: string;
    width: string;
    height: string;
    wheelbase: string;
  };
}

const SpecificationDropdown = ({ specs, dimensions }: SpecificationDropdownProps) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-t">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-left hover:bg-muted/30 transition-colors px-1 -mx-1 rounded">
          <h3 className="font-semibold text-base">ข้อมูลจำเพาะ</h3>
          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-4">
          <div className="grid gap-6 md:grid-cols-2 pt-2">
            {/* Technical Specs */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-primary">ข้อมูลทางเทคนิค</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-1.5 border-b border-dashed">
                  <span className="text-muted-foreground">ปีรถ</span>
                  <span className="font-medium">{specs.year}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed">
                  <span className="text-muted-foreground">เครื่องยนต์</span>
                  <span className="font-medium">{specs.engine}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed">
                  <span className="text-muted-foreground">ระบบขับเคลื่อน</span>
                  <span className="font-medium">{specs.drive}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-dashed">
                  <span className="text-muted-foreground">เกียร์</span>
                  <span className="font-medium">{specs.transmission}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-muted-foreground">เชื้อเพลิง</span>
                  <span className="font-medium">{specs.fuelType}</span>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-primary">ขนาดรถ</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">ความยาว</p>
                    <p className="text-sm font-medium">{dimensions.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <Move className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">ความกว้าง</p>
                    <p className="text-sm font-medium">{dimensions.width}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">ความสูง</p>
                    <p className="text-sm font-medium">{dimensions.height}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <Ruler className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">ฐานล้อ</p>
                    <p className="text-sm font-medium">{dimensions.wheelbase}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default SpecificationDropdown;
