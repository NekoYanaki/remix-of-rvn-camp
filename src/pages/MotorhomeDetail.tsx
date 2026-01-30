
import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotorhomeDetailPage from "@/components/motorhome/MotorhomeDetailPage";
import floorplanDay from "@/assets/floorplan-day.png";
import floorplanNight from "@/assets/floorplan-night.png";

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
      view360: "https://youtu.be/LX7z_--rQg0",
      productImages: [
        "/lovable-uploads/motorhome-gallery-2.png",
        "/lovable-uploads/motorhome-gallery-3.png",
        "/lovable-uploads/b047e00a-8752-47a7-8444-d4d4063f3d7a.png"
      ],
      floorPlan: {
        day: floorplanDay,
        night: floorplanNight
      },
      video: "https://youtu.be/Bki11UnPbGI"
    },
    price: 5000,
    rating: 4.9,
    reviewCount: 87,
    description: "รถบ้าน Mitsubishi Triton พร้อม Carryboy Motorhome ปรับปรุงใหม่ พร้อมอุปกรณ์ครบครัน เหมาะสำหรับการเดินทางท่องเที่ยวกับครอบครัวและเพื่อน มาพร้อมครัวในตัว ห้องน้ำ และเตียงนอนที่สะดวกสบาย ขับขี่ง่าย ประหยัดน้ำมัน",
    bestFor: "เหมาะสำหรับครอบครัว คู่รัก และนักเดินทางที่ชอบอิสระ",
    badges: ["Motorhome A Class"],
    specs: {
      passengers: 4,
      beds: 2,
      transmission: "อัตโนมัติ",
      fuelType: "ดีเซล",
      year: 2023,
      drive: "4WD",
      engine: "2.4L MIVEC Turbo Diesel",
      power: "181 แรงม้า @ 3,500 รอบ/นาที",
      torque: "430 Nm @ 2,500 รอบ/นาที",
      fuelTank: "75 ลิตร",
      fuelConsumption: "10-12 กม./ลิตร",
      gearbox: "6 สปีด อัตโนมัติ",
      brakes: "ดิสก์เบรก 4 ล้อ + ABS + EBD",
      suspension: "อิสระหน้า / แหนบหลัง",
      tires: "265/60 R18",
      waterTank: "80 ลิตร",
      greyWaterTank: "40 ลิตร",
      gasBottle: "4 กก.",
      battery: "12V 100Ah AGM + 200W Solar",
      inverter: "1,500W Pure Sine Wave"
    },
    highlights: ["Solar panel", "AC"],
    dimensions: {
      length: "5,915 มม.",
      width: "1,815 มม.",
      height: "2,950 มม.",
      wheelbase: "3,000 มม.",
      interiorHeight: "1,900 มม.",
      groundClearance: "220 มม.",
      grossWeight: "3,100 กก.",
      payload: "500 กก.",
      bedSize: "1,900 x 1,400 มม.",
      seatingCapacity: "4 ที่นั่ง (2 เบาะหน้า + 2 เบาะท้าย)",
      diningArea: "โต๊ะพับได้ รองรับ 4 คน"
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
      maxAge: 70,
      license: ["ใบขับขี่ประเภท 1 (อายุไม่น้อยกว่า 2 ปี)", "ใบขับขี่นานาชาติ (สำหรับชาวต่างชาติ)"],
      cancellation: "ยกเลิกฟรีก่อน 7 วันก่อนการเดินทาง",
      cancellationFee: "ยกเลิกหลัง 7 วัน มีค่าธรรมเนียม 50% ของยอดจอง",
      paymentOptions: ["ชำระเต็มจำนวน", "มัดจำ 20% (ไม่คืนเงิน) + ชำระอีก 80% ตอนรับรถ"],
      paymentMethods: {
        online: "Omise Gateway (บัตรเครดิต/เดบิต, PromptPay, TrueMoney)",
        atPickup: "เงินสด หรือ บัตรเครดิต/เดบิต เท่านั้น"
      },
      deposit: "มัดจำค้ำประกัน 10,000 บาท (คืนเต็มจำนวนหลังตรวจสภาพรถ)",
      mileage: "ไม่จำกัดระยะทาง",
      fuelPolicy: "รับรถเต็มถัง - คืนรถเต็มถัง",
      lateReturn: "ค่าปรับ 500 บาท/ชั่วโมง (หลังผ่อนผัน 1 ชั่วโมง)",
      earlyReturn: "ไม่สามารถขอคืนเงินสำหรับวันที่ไม่ได้ใช้งาน",
      smoking: "ห้ามสูบบุหรี่ในรถ (ค่าปรับ 5,000 บาท)",
      pets: "อนุญาตให้นำสัตว์เลี้ยงได้ (ค่าทำความสะอาดเพิ่ม 1,500 บาท)",
      internationalTravel: "ไม่อนุญาตให้ข้ามพรมแดน",
      minimumRental: "ขั้นต่ำ 1 วัน (ช่วงเทศกาล 3 วัน)",
      pickupTime: "รับรถ 09:00 - 17:00 น.",
      returnTime: "คืนรถ 09:00 - 17:00 น.",
      requiredDocuments: ["บัตรประชาชน หรือ พาสปอร์ต", "ใบขับขี่ที่ยังไม่หมดอายุ"],
      driverRequirements: "ผู้ขับขี่เพิ่มเติมต้องลงทะเบียนและมีคุณสมบัติเท่ากัน",
      roadsideAssistance: "บริการช่วยเหลือฉุกเฉิน 24 ชม. โทร 02-XXX-XXXX",
      damagePolicy: "รับผิดชอบความเสียหายสูงสุด 30,000 บาท (ลดเหลือ 10,000 บาท หากซื้อประกันเพิ่ม)"
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
