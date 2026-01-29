import React from "react";
import { ChevronDown, User, CreditCard, FileText, X } from "lucide-react";
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
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="border-t">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-4 text-left hover:bg-muted/30 transition-colors px-1 -mx-1 rounded">
          <h3 className="font-semibold text-base">เงื่อนไขและข้อกำหนด</h3>
          <ChevronDown className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </CollapsibleTrigger>
        <CollapsibleContent className="pb-4">
          <div className="space-y-4 pt-2">
            {/* Age Requirement */}
            <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
              <User className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">อายุขั้นต่ำ</p>
                <p className="text-sm text-muted-foreground">{terms.minAge} ปีขึ้นไป</p>
              </div>
            </div>

            {/* License */}
            <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
              <FileText className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">ใบอนุญาตขับขี่</p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-0.5">
                  {terms.license.map((license, idx) => (
                    <li key={idx}>• {license}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
              <CreditCard className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">วิธีการชำระเงิน</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {terms.payment.map((method, idx) => (
                    <span key={idx} className="text-xs bg-background px-2 py-1 rounded">
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Cancellation */}
            <div className="flex gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <X className="h-5 w-5 text-destructive flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">นโยบายการยกเลิก</p>
                <p className="text-sm text-muted-foreground">{terms.cancellation}</p>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default TermsDropdown;
