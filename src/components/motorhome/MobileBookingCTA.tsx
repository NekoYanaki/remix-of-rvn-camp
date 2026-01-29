import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MobileBookingCTAProps {
  price: number;
  onSelect: () => void;
}

const MobileBookingCTA = ({ price, onSelect }: MobileBookingCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg p-4 z-40 lg:hidden">
      <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
        <div>
          <span className="text-2xl font-bold text-primary">฿{price.toLocaleString()}</span>
          <span className="text-muted-foreground text-sm">/วัน</span>
        </div>
        <Button 
          size="lg"
          onClick={onSelect}
          className="flex-1 max-w-[200px] bg-primary hover:bg-primary/90"
        >
          เลือกคันนี้
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default MobileBookingCTA;
