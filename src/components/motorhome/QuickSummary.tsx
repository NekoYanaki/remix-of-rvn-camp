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
  "Solar panel": <Battery className="h-4 w-4" />,
  "Solar": <Battery className="h-4 w-4" />,
  "AC": <Snowflake className="h-4 w-4" />,
  "Shower": <ShowerHead className="h-4 w-4" />,
};

const QuickSummary = ({ specs, highlights = ["Solar panel", "AC"] }: QuickSummaryProps) => {
  const summaryItems = [
    { icon: <Users className="h-4 w-4" />, label: `${specs.passengers} ที่นั่ง`, key: "guests" },
    { icon: <BedDouble className="h-4 w-4" />, label: `${specs.beds} เตียง`, key: "beds" },
    { icon: <ShowerHead className="h-4 w-4" />, label: "ห้องน้ำในตัว", key: "bathroom" },
    { icon: <Settings className="h-4 w-4" />, label: specs.transmission, key: "transmission" },
    { icon: <Fuel className="h-4 w-4" />, label: specs.fuelType, key: "fuel" },
    ...highlights.slice(0, 2).map((h) => ({
      icon: highlightIcons[h] || <Sun className="h-4 w-4" />,
      label: h,
      key: h,
    })),
  ];

  return (
    <div className="flex flex-wrap gap-3 py-2">
      {summaryItems.map((item) => (
        <div
          key={item.key}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-muted/30 border border-border/30 rounded-full text-sm transition-colors hover:bg-muted/50"
        >
          <span className="text-muted-foreground">{item.icon}</span>
          <span className="text-foreground/80">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default QuickSummary;
