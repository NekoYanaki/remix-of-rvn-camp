import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface IncludedCategory {
  category: string;
  items: string[];
}

interface WhatsIncludedProps {
  includedItems: IncludedCategory[];
}

const WhatsIncluded = ({ includedItems }: WhatsIncludedProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t py-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 hover:bg-gray-50 rounded-lg px-2 transition-colors">
          <h3 className="font-semibold text-lg">What's Included</h3>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {includedItems.map((category, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-medium text-gray-800 border-b pb-2">
                  {category.category}
                </h4>
                <ul className="space-y-1">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="text-gray-600 text-sm flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default WhatsIncluded;
