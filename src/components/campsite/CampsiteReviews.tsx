
import React from "react";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CampsiteReviewsProps {
  campsite: {
    rating: number;
    reviewCount: number;
  };
}

const mockReviews = [
  {
    id: 1,
    author: "สมชาย สุขใจ",
    avatar: "/lovable-uploads/b3b48e94-e287-44ba-807a-e228a1df866a.png",
    country: "ไทย",
    date: "มีนาคม 2024",
    rating: 5,
    comment: "ที่พักดีมาก วิวสวย เจ้าของใจดี สิ่งอำนวยความสะดวกครบครัน จะกลับมาอีกแน่นอน!",
    helpful: 12
  },
  {
    id: 2,
    author: "วิภา รักธรรมชาติ",
    avatar: "/lovable-uploads/e4ce7067-7522-45d6-82c0-56a7fb4d8543.png",
    country: "ไทย",
    date: "กุมภาพันธ์ 2024",
    rating: 4,
    comment: "บรรยากาศดี เงียบสงบ เหมาะกับการพักผ่อน มีพื้นที่กว้างขวางสำหรับรถบ้าน",
    helpful: 8
  },
  {
    id: 3,
    author: "ธนา เดินทาง",
    avatar: "/lovable-uploads/b3b48e94-e287-44ba-807a-e228a1df866a.png",
    country: "ไทย",
    date: "มกราคม 2024",
    rating: 5,
    comment: "สะดวกสบายมาก มีน้ำประปา ไฟฟ้าพร้อม เหมาะสำหรับ Campervan และ Motorhome",
    helpful: 15
  }
];

export const CampsiteReviews = ({ campsite }: CampsiteReviewsProps) => {
  return (
    <div className="bg-white rounded-lg p-6 border">
      {/* Review Header - Star Rating Only */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">รีวิวจากผู้เข้าพัก</h2>
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          <span className="text-lg font-semibold">{campsite.rating}</span>
          <span className="text-gray-600">• {campsite.reviewCount} รีวิว</span>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {mockReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-100 last:border-0 pb-6 last:pb-0">
            <div className="flex items-start gap-4">
              <img
                src={review.avatar}
                alt={review.author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{review.author}</span>
                  <span className="text-sm text-gray-500">• {review.country}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-700 mb-3">{review.comment}</p>
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                  <ThumbsUp className="h-4 w-4" />
                  เป็นประโยชน์ ({review.helpful})
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-6">
        ดูรีวิวทั้งหมด {campsite.reviewCount} รีวิว
      </Button>
    </div>
  );
};
