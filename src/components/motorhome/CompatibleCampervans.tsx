import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Users, BedDouble, CarFront } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Campervan {
  id: string;
  name: string;
  type: string;
  image: string;
  price: number;
  rating: number;
  passengers: number;
  beds: number;
}

interface CompatibleCampervansProps {
  currentId: string;
}

// Mock data for similar campervans
const mockCampervans: Campervan[] = [
  {
    id: "2",
    name: "Motorhome B Class",
    type: "Toyota Hilux Camper",
    image: "/lovable-uploads/motorhome-gallery-1.png",
    price: 4500,
    rating: 4.8,
    passengers: 4,
    beds: 2,
  },
  {
    id: "3",
    name: "Motorhome C Class",
    type: "Isuzu D-Max Adventure",
    image: "/lovable-uploads/motorhome-gallery-2.png",
    price: 4200,
    rating: 4.7,
    passengers: 3,
    beds: 1,
  },
  {
    id: "4",
    name: "Van Camper",
    type: "Hyundai H1 Camper",
    image: "/lovable-uploads/motorhome-gallery-3.png",
    price: 3800,
    rating: 4.6,
    passengers: 5,
    beds: 2,
  },
];

const CompatibleCampervans = ({ currentId }: CompatibleCampervansProps) => {
  const navigate = useNavigate();

  // Filter out current motorhome
  const campervans = mockCampervans.filter((c) => c.id !== currentId).slice(0, 3);

  return (
    <div className="py-5 border-t">
      <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
        <CarFront className="h-5 w-5 text-primary" />
        รถแนะนำอื่นๆ
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {campervans.map((campervan) => (
          <Card
            key={campervan.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
            onClick={() => navigate(`/motorhome-detail/${campervan.id}`)}
          >
            <div className="aspect-[16/10] relative overflow-hidden">
              <img
                src={campervan.image}
                alt={campervan.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-sm">{campervan.type}</h4>
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium">{campervan.rating}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  {campervan.passengers}
                </span>
                <span className="flex items-center gap-1">
                  <BedDouble className="h-3.5 w-3.5" />
                  {campervan.beds}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-primary">
                  ฿{campervan.price.toLocaleString()}/วัน
                </span>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  ดูรายละเอียด
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CompatibleCampervans;
