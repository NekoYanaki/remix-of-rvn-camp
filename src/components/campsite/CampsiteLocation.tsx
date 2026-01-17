
import React from "react";
import { MapPin } from "lucide-react";

interface CampsiteLocationProps {
  campsite: {
    location: {
      address: string;
      city: string;
      country: string;
      coordinates: { lat: number; lng: number };
    };
  };
}

export const CampsiteLocation = ({ campsite }: CampsiteLocationProps) => {
  return (
    <div className="bg-white rounded-lg p-6 border">
      <h2 className="text-xl font-semibold mb-4">ตำแหน่งที่ตั้ง</h2>
      <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
        <div className="text-center">
          <MapPin className="h-8 w-8 text-gray-400 mx-auto mb-2" />
          <span className="text-gray-500">แผนที่จะแสดงที่นี่</span>
        </div>
      </div>
      <p className="text-gray-600 mb-2">
        <strong>ที่อยู่:</strong> {campsite.location.address}
      </p>
      <p className="text-gray-600">
        {campsite.location.city}, {campsite.location.country}
      </p>
    </div>
  );
};
