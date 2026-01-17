
import React from "react";
import { Star, MapPin } from "lucide-react";

interface CampsiteHeaderProps {
  campsite: {
    name: string;
    rating: number;
    reviewCount: number;
    location: {
      address: string;
      city: string;
      country: string;
    };
  };
}

export const CampsiteHeader = ({ campsite }: CampsiteHeaderProps) => {
  return (
    <div className="mb-6">
      {/* Badge - Only Campsite */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
          Campsite
        </span>
      </div>

      {/* Main Title */}
      <h1 className="text-3xl font-bold text-gray-900 mb-3">{campsite.name}</h1>

      {/* Rating and Location */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-lg">{campsite.rating}</span>
          </div>
          <span className="text-gray-600">
            ({campsite.reviewCount} reviews)
          </span>
          <span className="text-green-600 font-medium hover:underline cursor-pointer">
            Read all reviews
          </span>
        </div>

        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{campsite.location.address}, {campsite.location.city}</span>
          <span className="text-green-600 hover:underline cursor-pointer">
            Show on map
          </span>
        </div>
      </div>
    </div>
  );
};
