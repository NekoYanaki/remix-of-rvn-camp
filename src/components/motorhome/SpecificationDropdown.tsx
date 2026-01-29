import React, { useState } from "react";
import { ChevronDown, ChevronUp, Ruler } from "lucide-react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t py-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Ruler className="h-5 w-5 text-primary" />
            Specification
          </h3>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vehicle Specs */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800 border-b pb-2">Vehicle Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Year</span>
                  <span className="font-medium">{specs.year}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Fuel Type</span>
                  <span className="font-medium">{specs.fuelType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Engine</span>
                  <span className="font-medium">{specs.engine}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Transmission</span>
                  <span className="font-medium">{specs.transmission}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Drive</span>
                  <span className="font-medium">{specs.drive}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Passengers</span>
                  <span className="font-medium">{specs.passengers} persons</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Beds</span>
                  <span className="font-medium">{specs.beds} beds</span>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div className="space-y-3">
              <h4 className="font-medium text-gray-800 border-b pb-2">Dimensions</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Length</span>
                  <span className="font-medium">{dimensions.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Width</span>
                  <span className="font-medium">{dimensions.width}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Height</span>
                  <span className="font-medium">{dimensions.height}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Wheelbase</span>
                  <span className="font-medium">{dimensions.wheelbase}</span>
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
