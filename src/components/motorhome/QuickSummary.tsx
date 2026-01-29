import React from "react";
import {
  Users,
  BedDouble,
  ShowerHead,
  Settings,
  Fuel,
  Sun,
  Snowflake,
  Battery,
} from "lucide-react";

interface QuickSummaryProps {
  specs: {
    passengers: number;
    beds: number;
    transmission: string;
    fuelType: string;
  };
  highlights?: string[];
}

const highlightIcons: Record<string, React.ReactNode> = {
  "Solar": <Battery className="h-4 w-4" />,
  "AC": <Snowflake className="h-4 w-4" />,
  "Shower": <ShowerHead className="h-4 w-4" />,
};

const QuickSummary = ({ specs, highlights = ["Solar", "AC"] }: QuickSummaryProps) => {
  const summaryItems = [
    { icon: <Users className="h-4 w-4" />, label: `${specs.passengers} คน`, key: "guests" },
    { icon: <BedDouble className="h-4 w-4" />, label: `${specs.beds} เตียง`, key: "beds" },
    { icon: <ShowerHead className="h-4 w-4" />, label: "ห้องน้ำ", key: "bathroom" },
    { icon: <Settings className="h-4 w-4" />, label: specs.transmission, key: "transmission" },
    { icon: <Fuel className="h-4 w-4" />, label: specs.fuelType, key: "fuel" },
    ...highlights.slice(0, 2).map((h) => ({
      icon: highlightIcons[h] || <Sun className="h-4 w-4" />,
      label: h,
      key: h,
    })),
  ];

  return (
    <div className="flex flex-wrap gap-2 py-4">
      {summaryItems.map((item) => (
        <div
          key={item.key}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted/60 rounded-full text-sm"
        >
          <span className="text-primary">{item.icon}</span>
          <span className="text-foreground/80 font-medium">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default QuickSummary;
