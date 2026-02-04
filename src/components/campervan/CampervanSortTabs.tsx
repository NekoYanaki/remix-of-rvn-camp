import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "recommended" | "price-low" | "price-high" | "seats" | "newest";

interface CampervanSortTabsProps {
  activeSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultsCount: number;
}

const sortOptions = [
  { value: "recommended", label: "แนะนำ" },
  { value: "price-low", label: "ราคาต่ำ-สูง" },
  { value: "price-high", label: "ราคาสูง-ต่ำ" },
  { value: "seats", label: "ที่นั่ง" },
  { value: "newest", label: "ใหม่ล่าสุด" },
];

const CampervanSortTabs = ({
  activeSort,
  onSortChange,
  resultsCount,
}: CampervanSortTabsProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <p className="text-lg font-semibold text-foreground">
        <span className="font-bold">{resultsCount}</span> Vehicle type found
      </p>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">เรียงลำดับ:</span>
        <Select value={activeSort} onValueChange={(v) => onSortChange(v as SortOption)}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CampervanSortTabs;
