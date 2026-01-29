import React from "react";
import {
  Car,
  Calendar,
  Fuel,
  Gauge,
  Settings,
  Users,
  BedDouble,
} from "lucide-react";

interface VehicleSpecsProps {
  specs: {
    passengers: number;
    beds: number;
    transmission: string;
    fuelType: string;
    year: number;
    drive: string;
    engine: string;
  };
}

const VehicleSpecs = ({ specs }: VehicleSpecsProps) => {
  const specItems = [
    { icon: <Calendar className="h-5 w-5 text-blue-500" />, label: "ปี", value: specs.year },
    { icon: <Fuel className="h-5 w-5 text-orange-500" />, label: "เชื้อเพลิง", value: specs.fuelType },
    { icon: <Gauge className="h-5 w-5 text-red-500" />, label: "เครื่องยนต์", value: specs.engine },
    { icon: <Settings className="h-5 w-5 text-gray-600" />, label: "เกียร์", value: specs.transmission },
    { icon: <Car className="h-5 w-5 text-green-500" />, label: "ระบบขับเคลื่อน", value: specs.drive },
    { icon: <Users className="h-5 w-5 text-purple-500" />, label: "ผู้โดยสาร", value: `${specs.passengers} คน` },
    { icon: <BedDouble className="h-5 w-5 text-indigo-500" />, label: "เตียงนอน", value: `${specs.beds} เตียง` },
  ];

  return (
    <div className="py-6 border-t">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <Car className="h-5 w-5 text-primary" />
        ข้อมูลจำเพาะ
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {specItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            {item.icon}
            <div>
              <p className="text-xs text-gray-500">{item.label}</p>
              <p className="font-medium">{item.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleSpecs;
