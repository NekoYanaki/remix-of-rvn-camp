
import React from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CampsiteDetailPage from "@/components/campsite/CampsiteDetailPage";

// Mock data based on partner registration - บ้านอิ่มสุขแคมป์ปิ้ง เพชรบุรี
const getCampsiteData = (id: string) => {
  const partnerData = {
    id: id || "d639a81f-8c05-40a1-85e1-6bf70c77a931",
    name: "บ้านอิ่มสุขแคมป์ปิ้ง เพชรบุรี",
    images: [
      "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/main_image/mainimage.png",
      "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/1.jpg",
      "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/2.jpg",
      "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/3.jpg",
      "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/4.jpg"
    ],
    price: 500,
    rating: 4.8,
    reviewCount: 24,
    description: "บ้านอิ่มสุขแคมป์ปิ้ง ที่พักสำหรับรถบ้านและแคมป์ปิ้ง ตั้งอยู่ใน อ.ท่ายาง จ.เพชรบุรี บรรยากาศดี เงียบสงบ มีพื้นที่สีเขียว เหมาะสำหรับการพักผ่อน พร้อมสิ่งอำนวยความสะดวกครบครัน ไฟฟ้า น้ำประปา Wi-Fi ห้องน้ำสะอาด",
    location: {
      address: "27 ม.11 ต.กลัดหลวง อ.ท่ายาง",
      city: "เพชรบุรี",
      country: "ประเทศไทย",
      coordinates: { lat: 12.8432, lng: 99.8345 }
    },
    amenities: [
      "ไฟฟ้าให้เชื่อมต่อ",
      "จุดทิ้งน้ำเสีย", 
      "ระบบน้ำประปา",
      "Wi-Fi ฟรี",
      "ห้องน้ำและห้องอาบน้ำ",
      "จุดทำอาหาร (ครัวกลาง/เตาปิ้งย่าง)",
      "พื้นที่จอดรถยนต์เสริม",
      "บริเวณพักผ่อน/ลานกางเต็นท์",
      "จุดทิ้งขยะและระบบจัดการขยะ",
      "ระบบรักษาความปลอดภัย (CCTV)",
      "แสงสว่างในพื้นที่",
      "ร้านค้าหรือร้านอาหารใกล้เคียง"
    ],
    activities: [
      "กิจกรรมท้องถิ่น",
      "การท่องเที่ยวใกล้เคียง",
      "พักผ่อนท่ามกลางธรรมชาติ",
      "ถ่ายภาพวิวทิวทัศน์"
    ],
    rules: [
      "อนุญาตให้นำสัตว์เลี้ยงเข้าพัก (กรุณาตรวจสอบกฎเกี่ยวกับสัตว์เลี้ยง)",
      "เช็คอิน: 14:00 น.",
      "เช็คเอาท์: 12:00 น.",
      "กรุณารักษาความเงียบสงบ",
      "ทิ้งขยะในจุดที่กำหนด"
    ],
    stayOptions: [
      {
        type: "ลานจอดรถ โซน A",
        description: "พื้นที่สำหรับจอดรถบ้าน Caravan, Motorhome ทุกประเภท พร้อมไฟฟ้าและน้ำประปา ใกล้ริมน้ำ ทำให้อากาศเย็น ร่มรื่น",
        maxGuests: 6,
        price: 250,
        priceType: "per_person" as const,
        slots: 10,
        unit: "คน",
        images: [
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/1.jpg",
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/2.jpg",
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/3.jpg",
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/4.jpg"
        ],
        supportedVehicles: ["Caravan", "Motorhome A Class", "Motorhome B Class", "Motorhome C Class", "Campervan"],
        amenities: [
          "ไฟฟ้าให้เชื่อมต่อ",
          "จุดทิ้งน้ำเสีย",
          "ระบบน้ำประปา",
          "Wi-Fi ฟรี",
          "ห้องน้ำและห้องอาบน้ำ"
        ]
      },
      {
        type: "ลานจอดรถ โซน B",
        description: "พื้นที่สำหรับจอดรถบ้านแบบไม่ใช้ไฟฟ้า เหมาะสำหรับผู้ที่มี Solar Panel บรรยากาศร่มรื่นใกล้ชิดธรรมชาติ",
        maxGuests: 6,
        price: 200,
        priceType: "per_person" as const,
        slots: 8,
        unit: "คน",
        images: [
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/2.jpg",
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/3.jpg",
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/4.jpg",
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/1.jpg"
        ],
        supportedVehicles: ["Caravan", "Campervan"],
        amenities: [
          "ระบบน้ำประปา",
          "ห้องน้ำและห้องอาบน้ำ",
          "พื้นที่จอดรถยนต์เสริม"
        ]
      },
      {
        type: "พื้นที่กางเต็นท์",
        description: "พื้นที่สำหรับกางเต็นท์ บรรยากาศร่มรื่น ใกล้ชิดธรรมชาติ เหมาะสำหรับครอบครัวหรือกลุ่มเพื่อน",
        maxGuests: 4,
        price: 150,
        priceType: "per_person" as const,
        slots: 15,
        unit: "คน",
        images: [
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/3.jpg",
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/4.jpg",
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/1.jpg",
          "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/image_list/2.jpg"
        ],
        amenities: [
          "ห้องน้ำและห้องอาบน้ำ",
          "จุดทำอาหาร (ครัวกลาง/เตาปิ้งย่าง)",
          "บริเวณพักผ่อน/ลานกางเต็นท์"
        ]
      }
    ],
    host: {
      name: "บ้านอิ่มสุขแคมป์ปิ้ง",
      avatar: "https://api.rvncamp.com/api/file/getfile?pathname=camp/25ea0fa2-7f03-47d9-9f67-413995c1d395/main_image/mainimage.png",
      joinedDate: "2024",
      phone: "0625958885",
      email: "kaengkrachanhos2@gmail.com"
    },
    supportedVehicles: [
      "Caravan",
      "Motorhome A Class",
      "Motorhome B Class", 
      "Motorhome C Class",
      "Campervan"
    ],
    checkIn: "14:00",
    checkOut: "12:00"
  };

  return partnerData;
};

const CampsiteDetails = () => {
  const { id } = useParams();
  const campsite = getCampsiteData(id || "1");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <CampsiteDetailPage campsite={campsite} />
      </main>
      <Footer />
    </div>
  );
};

export default CampsiteDetails;
