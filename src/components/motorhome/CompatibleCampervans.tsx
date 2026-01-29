import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, Users, BedDouble } from "lucide-react";
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
  const campervans = mockCampervans.filter((c) => c.id !== currentId);

  return (
    <div className="py-6 border-t">
      <h3 className="font-semibold text-lg mb-4">Compatible Campervans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {campervans.map((campervan) => (
          <Card
            key={campervan.id}
            className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => navigate(`/motorhome-detail/${campervan.id}`)}
          >
            <div className="aspect-video relative">
              <img
                src={campervan.image}
                alt={campervan.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{campervan.name}</h4>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{campervan.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{campervan.type}</p>
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {campervan.passengers}
                </span>
                <span className="flex items-center gap-1">
                  <BedDouble className="h-4 w-4" />
                  {campervan.beds}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  ฿{campervan.price.toLocaleString()}/วัน
                </span>
                <Button variant="outline" size="sm">
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
