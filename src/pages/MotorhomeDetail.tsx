
import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotorhomeDetailPage from "@/components/motorhome/MotorhomeDetailPage";

// Mock data for motorhome with new structure
const getMotorhomeData = (id: string) => {
  const baseData = {
    id: id || "1",
    name: "Carryboy Motorhome",
    model: "Triton",
    brand: "Mitsubishi",
    vehicleType: "Motorhome A Class",
    images: {
      main: "/lovable-uploads/motorhome-main.jpg",
      view360: "/lovable-uploads/motorhome-gallery-1.png",
      productImages: [
        "/lovable-uploads/motorhome-gallery-2.png",
        "/lovable-uploads/motorhome-gallery-3.png",
        "/lovable-uploads/b047e00a-8752-47a7-8444-d4d4063f3d7a.png"
      ],
      floorPlan: {
        day: "/lovable-uploads/motorhome-gallery-2.png",
        night: "/lovable-uploads/motorhome-gallery-3.png"
      }
    },
    price: 5000,
    rating: 4.9,
    reviewCount: 87,
    description: "รถบ้าน Mitsubishi Triton พร้อม Carryboy Motorhome ปรับปรุงใหม่ พร้อมอุปกรณ์ครบครัน เหมาะสำหรับการเดินทางท่องเที่ยวกับครอบครัวและเพื่อน มาพร้อมครัวในตัว ห้องน้ำ และเตียงนอนที่สะดวกสบาย ขับขี่ง่าย ประหยัดน้ำมัน",
    badges: ["Motorhome A Class"],
    specs: {
      passengers: 4,
      beds: 2,
      transmission: "อัตโนมัติ",
      fuelType: "ดีเซล",
      year: 2023,
      drive: "4WD",
      engine: "2.8L"
    },
    dimensions: {
      length: "5,915 มม.",
      width: "1,815 มม.",
      height: "2,950 มม.",
      wheelbase: "3,000 มม."
    },
    amenities: [
      { name: "Shower", available: true },
      { name: "Toilet", available: true },
      { name: "Freezer", available: true },
      { name: "Kitchen equipment", available: true },
      { name: "Fridge", available: true },
      { name: "Hot water", available: true },
      { name: "GPS", available: false },
      { name: "AC in cab", available: true },
      { name: "AC in living area", available: true },
      { name: "Bluetooth", available: true },
      { name: "TV", available: true },
      { name: "Floor heating", available: true },
      { name: "Aux-port", available: false },
      { name: "Solar panel", available: true },
      { name: "Adapter to electrical connection", available: true },
      { name: "Mosquito net", available: true }
    ],
    includedItems: [
      {
        category: "Linen",
        items: ["Pillows, Quilts / Doonas", "Sheets, Bath Towels, Bath Mat, Tea Towels"]
      },
      {
        category: "Crockery & Glassware",
        items: ["Tumblers, Mugs, Side Plates, Dinner Plates", "Bowls"]
      },
      {
        category: "Cutlery",
        items: ["Knives, Forks, Teaspoons & Spoons, Serving Spoon, Spatula, Can Opener, Tongs", "Vegetable Peeler"]
      },
      {
        category: "Kitchen Equipment",
        items: ["Saucepan, Frypan, Electric Kettle & Toaster", "Cutting Board, Storage Containers", "Dustpan & Brush, Bucket, Broom"]
      },
      {
        category: "Hygiene and Housekeeping",
        items: ["Dishwashing Detergent & Brush/Sponge", "Fresh & Grey Water Hoses, Charging Cable"]
      },
      {
        category: "Outdoor Living",
        items: ["Camping Table, Camping Chairs"]
      },
      {
        category: "Safety Equipment",
        items: ["Fire Extinguisher, Spare Wheel & Jack Supplied"]
      }
    ],
    addons: [
      { id: "bedding", name: "ชุดเครื่องนอน", price: 500, description: "ผ้าปูที่นอน หมอน ผ้าห่ม" },
      { id: "camping_gear", name: "อุปกรณ์แคมป์ปิ้ง", price: 800, description: "โต๊ะพับ เก้าอี้ 4 ตัว" },
      { id: "bbq", name: "เตาปิ้งย่าง", price: 300, description: "เตาปิ้งย่างพร้อมถ่าน" },
      { id: "bike_rack", name: "แร็คจักรยาน", price: 400, description: "แร็คสำหรับจักรยาน 2 คัน" },
      { id: "gps", name: "GPS นำทาง", price: 200, description: "อุปกรณ์นำทาง GPS" },
      { id: "child_seat", name: "เบาะนั่งเด็ก", price: 250, description: "เบาะนั่งนิรภัยสำหรับเด็ก" }
    ],
    insuranceOptions: [
      { id: "basic", name: "ประกันพื้นฐาน", price: 0, description: "ประกันภัยชั้น 3 คุ้มครองความเสียหายต่อบุคคลภายนอก", coverage: "1,000,000 บาท" },
      { id: "standard", name: "ประกันมาตรฐาน", price: 300, description: "ประกันภัยชั้น 2+ คุ้มครองความเสียหายจากอุบัติเหตุ", coverage: "2,000,000 บาท" },
      { id: "premium", name: "ประกันพรีเมี่ยม", price: 500, description: "ประกันภัยชั้น 1 คุ้มครองครอบคลุมทุกความเสียหาย", coverage: "5,000,000 บาท" }
    ],
    pickupLocations: [
      { id: "tkd", name: "TKD Fiber Co.,Ltd (CARRYBOY เครือข่าย)", address: "กรุงเทพมหานคร" },
      { id: "suvarnabhumi", name: "สนามบิน สุวรรณภูมิ", address: "สมุทรปราการ" },
      { id: "donmueang", name: "สนามบิน ดอนเมือง", address: "กรุงเทพมหานคร" }
    ],
    pricing: {
      basePrice: 5000,
      insurance: 300,
      cleaning: 500,
      deposit: 10000,
      minDays: 1
    },
    terms: {
      minAge: 25,
      license: ["ใบขับขี่ประเภท 1", "ใบขับขี่นานาชาติ"],
      cancellation: "ยกเลิกได้ฟรีภายใน 48 ชั่วโมงก่อนการเดินทาง",
      payment: ["โอนธนาคาร", "QR Code", "บัตรเครดิต"]
    }
  };

  return baseData;
};

const MotorhomeDetail = () => {
  const { id } = useParams();
  const motorhome = getMotorhomeData(id || "1");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <MotorhomeDetailPage motorhome={motorhome} />
      </main>
      <Footer />
    </div>
  );
};

export default MotorhomeDetail;
