import React from "react";
import { ChevronDown, Check } from "lucide-react";
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
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-t">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-left hover:bg-muted/30 transition-colors px-1 -mx-1 rounded">
          <h3 className="font-semibold text-base">สิ่งที่รวมในแพ็คเกจ</h3>
          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-4">
          <div className="grid gap-4 md:grid-cols-2 pt-2">
            {includedItems.map((category, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-medium text-sm text-primary">{category.category}</h4>
                <ul className="space-y-1">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
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
