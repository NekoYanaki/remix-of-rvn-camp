import React, { useState } from "react";
import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface TermsDropdownProps {
  terms: {
    minAge: number;
    license: string[];
    cancellation: string;
    payment: string[];
  };
}

const TermsDropdown = ({ terms }: TermsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t py-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Terms and Conditions
          </h3>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-4">
            {/* Age Requirement */}
            <div className="space-y-1">
              <h4 className="font-medium text-gray-800">Minimum Age</h4>
              <p className="text-sm text-gray-600">{terms.minAge} years old</p>
            </div>

            {/* License Requirements */}
            <div className="space-y-1">
              <h4 className="font-medium text-gray-800">License Requirements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {terms.license.map((license, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    {license}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cancellation Policy */}
            <div className="space-y-1">
              <h4 className="font-medium text-gray-800">Cancellation Policy</h4>
              <p className="text-sm text-gray-600">{terms.cancellation}</p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-1">
              <h4 className="font-medium text-gray-800">Payment Methods</h4>
              <div className="flex flex-wrap gap-2">
                {terms.payment.map((method, idx) => (
                  <span
                    key={idx}
                    className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TermsDropdown;
