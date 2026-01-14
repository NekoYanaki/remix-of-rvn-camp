import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type SortOption = "recommended" | "price-low" | "price-high" | "rating" | "capacity";

interface SortingTabsProps {
  activeSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  resultsCount: number;
}

const SortingTabs = ({ activeSort, onSortChange, resultsCount }: SortingTabsProps) => {
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "recommended", label: "แนะนำ" },
    { value: "price-low", label: "ราคาต่ำสุดก่อน" },
    { value: "price-high", label: "ราคาสูงสุดก่อน" },
    { value: "rating", label: "คะแนนรีวิว" },
    { value: "capacity", label: "ความจุ" },
  ];

  return (
    <div className="bg-background border rounded-lg p-2 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1">
          <span className="text-sm text-muted-foreground mr-2">เรียงลำดับ:</span>
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              size="sm"
              onClick={() => onSortChange(option.value)}
              className={cn(
                "h-8 px-3 text-sm font-normal",
                activeSort === option.value
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label}
            </Button>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          พบ <span className="font-semibold text-foreground">{resultsCount}</span> รายการ
        </span>
      </div>
    </div>
  );
};

export default SortingTabs;
