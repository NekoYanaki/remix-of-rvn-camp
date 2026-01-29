import React from "react";
import { Star, ThumbsUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReviewsSectionProps {
  motorhome: {
    rating: number;
    reviewCount: number;
  };
  maxReviews?: number;
}

const mockReviews = [
  {
    id: 1,
    author: "สมชาย ใจดี",
    avatar: "/lovable-uploads/b3b48e94-e287-44ba-807a-e228a1df866a.png",
    rating: 5,
    date: "มีนาคม 2024",
    text: "รถสะอาดมาก เจ้าของใจดี อุปกรณ์ครบครัน เหมาะสำหรับเดินทางกับครอบครัว ประทับใจมากครับ",
    helpful: 12
  },
  {
    id: 2,
    author: "น้องแนน",
    avatar: "/lovable-uploads/b3b48e94-e287-44ba-807a-e228a1df866a.png",
    rating: 5,
    date: "กุมภาพันธ์ 2024",
    text: "ขับง่าย ประหยัดน้ำมัน ที่นอนนุ่มสบาย ครัวใช้ได้จริง จะมาเช่าอีกแน่นอนค่ะ",
    helpful: 8
  },
  {
    id: 3,
    author: "ปิติ นักเดินทาง",
    avatar: "/lovable-uploads/b3b48e94-e287-44ba-807a-e228a1df866a.png",
    rating: 4,
    date: "มกราคม 2024",
    text: "โดยรวมดีมาก แต่เครื่องปรับอากาศเสียงดังนิดหน่อย นอกนั้นไม่มีปัญหาครับ",
    helpful: 5
  }
];

export const ReviewsSection = ({ motorhome, maxReviews = 3 }: ReviewsSectionProps) => {
  const displayedReviews = mockReviews.slice(0, maxReviews);

  return (
    <div className="space-y-4">
      {/* Compact Rating Summary */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-primary/10 px-3 py-1.5 rounded-full">
            <Star className="h-5 w-5 fill-primary text-primary" />
            <span className="text-lg font-bold text-primary">{motorhome.rating}</span>
          </div>
          <div>
            <p className="text-sm font-medium">{motorhome.reviewCount} รีวิว</p>
            <p className="text-xs text-muted-foreground">จากผู้เช่าจริง</p>
          </div>
        </div>
      </div>

      {/* Reviews List - Compact */}
      <div className="space-y-4">
        {displayedReviews.map((review) => (
          <div key={review.id} className="flex gap-3 pb-4 border-b last:border-b-0 last:pb-0">
            <img
              src={review.avatar}
              alt={review.author}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-medium text-sm">{review.author}</span>
                <div className="flex items-center gap-0.5">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">{review.date}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{review.text}</p>
              <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-2">
                <ThumbsUp className="h-3 w-3" />
                <span>มีประโยชน์ ({review.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {mockReviews.length > maxReviews && (
        <Button variant="outline" size="sm" className="w-full">
          ดูรีวิวทั้งหมด
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      )}
    </div>
  );
};
