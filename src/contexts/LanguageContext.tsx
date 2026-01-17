import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "th" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  th: {
    // Header
    "nav.home": "หน้าหลัก",
    "nav.campsite": "แคมป์ไซต์",
    "nav.motorhome": "รถบ้าน",
    "nav.guide": "ไกด์ไลน์",
    "nav.contact": "ติดต่อเรา",
    "nav.login": "เข้าสู่ระบบ",
    
    // Campsite Detail
    "campsite.overview": "ภาพรวม",
    "campsite.zones": "ข้อมูลโซน",
    "campsite.location": "ตำแหน่ง",
    "campsite.reviews": "รีวิว",
    "campsite.about": "เกี่ยวกับที่พัก",
    "campsite.host": "เจ้าของที่พัก",
    "campsite.memberSince": "เป็นสมาชิกตั้งแต่ปี",
    "campsite.checkIn": "เช็คอิน",
    "campsite.checkOut": "เช็คเอาท์",
    "campsite.showOnMap": "ดูบนแผนที่",
    "campsite.readAllReviews": "อ่านรีวิวทั้งหมด",
    
    // Zone Info
    "zone.supportedVehicles": "รถที่รองรับในโซนนี้",
    "zone.amenities": "สิ่งอำนวยความสะดวกในโซนนี้",
    "zone.safety": "ความปลอดภัยและการรักษาความปลอดภัย",
    "zone.additionalServices": "บริการเสริมและสิ่งอำนวยความสะดวกอื่นๆ",
    "zone.atmosphere": "บรรยากาศและสิ่งแวดล้อม",
    "zone.rules": "กฎระเบียบในการเข้าพัก",
    "zone.petsAllowed": "อนุญาตให้นำสัตว์เลี้ยงเข้าพัก",
    "zone.petsNotAllowed": "ไม่อนุญาตให้นำสัตว์เลี้ยง",
    "zone.petRules": "กฎเกี่ยวกับสัตว์เลี้ยง",
    "zone.cancellationPolicy": "นโยบายยกเลิก",
    "zone.calendar": "ปฏิทินว่าง",
    "zone.availableSlots": "เหลือ {count} สล็อต",
    "zone.selectDate": "เลือกวันที่เพื่อดูสล็อตว่าง",
    "zone.today": "วันนี้",
    "zone.slotsFrom": "จาก",
    "zone.maxGuests": "สูงสุด {count} คน",
    "zone.slots": "จำนวนสล็อต",
    "zone.unit": "หน่วย",
    "zone.perNight": "ต่อคืน",
    "zone.perPerson": "ต่อคน/คืน",
    
    // Booking
    "booking.title": "รายการจอง",
    "booking.empty": "ยังไม่มีรายการจอง",
    "booking.emptyHint": "เลือกโซนและวันที่เข้าพักจากด้านซ้าย",
    "booking.items": "รายการ",
    "booking.checkout": "ดำเนินการชำระเงิน",
    "booking.addMore": "คุณสามารถเพิ่มที่พักอื่นๆ ได้ก่อนชำระเงิน",
    "booking.total": "ราคารวมทั้งหมด",
    "booking.nights": "คืน",
    "booking.guests": "คน",
    "booking.bookZone": "จองโซนนี้",
    "booking.selectDate": "วันที่เข้าพัก",
    "booking.selectDatePlaceholder": "เลือกวันเช็คอิน - เช็คเอาท์",
    "booking.guestCount": "จำนวนผู้เข้าพัก",
    "booking.bookNow": "จองที่พักในโซนนี้",
    "booking.totalPrice": "ราคารวม",
    "booking.added": "เพิ่ม {name} เข้าสู่รายการจองแล้ว",
    "booking.selectDateError": "กรุณาเลือกวันที่เช็คอิน-เช็คเอาท์",
    
    // Reviews
    "reviews.title": "รีวิวจากผู้เข้าพัก",
    "reviews.helpful": "เป็นประโยชน์",
    "reviews.loadMore": "ดูรีวิวเพิ่มเติม",
    "reviews.noMore": "ไม่มีรีวิวเพิ่มเติม",
    
    // Calendar Legend
    "calendar.available": "ว่างมาก (มากกว่า 3 สล็อต)",
    "calendar.limited": "ใกล้เต็ม (1-3 สล็อต)",
    "calendar.full": "เต็ม",
    
    // Common
    "common.back": "กลับ",
    "common.share": "แชร์",
    "common.save": "บันทึก",
    "common.loading": "กำลังโหลด...",
    "common.photos": "รูป",
  },
  en: {
    // Header
    "nav.home": "Home",
    "nav.campsite": "Campsites",
    "nav.motorhome": "Motorhome",
    "nav.guide": "Guide",
    "nav.contact": "Contact",
    "nav.login": "Login",
    
    // Campsite Detail
    "campsite.overview": "Overview",
    "campsite.zones": "Zone Info",
    "campsite.location": "Location",
    "campsite.reviews": "Reviews",
    "campsite.about": "About",
    "campsite.host": "Host",
    "campsite.memberSince": "Member since",
    "campsite.checkIn": "Check-in",
    "campsite.checkOut": "Check-out",
    "campsite.showOnMap": "Show on map",
    "campsite.readAllReviews": "Read all reviews",
    
    // Zone Info
    "zone.supportedVehicles": "Supported vehicles",
    "zone.amenities": "Amenities in this zone",
    "zone.safety": "Safety & Security",
    "zone.additionalServices": "Additional services",
    "zone.atmosphere": "Atmosphere & Environment",
    "zone.rules": "Rules & Regulations",
    "zone.petsAllowed": "Pets allowed",
    "zone.petsNotAllowed": "No pets allowed",
    "zone.petRules": "Pet rules",
    "zone.cancellationPolicy": "Cancellation policy",
    "zone.calendar": "Availability Calendar",
    "zone.availableSlots": "{count} slots available",
    "zone.selectDate": "Select date to check availability",
    "zone.today": "Today",
    "zone.slotsFrom": "from",
    "zone.maxGuests": "Max {count} guests",
    "zone.slots": "Slots",
    "zone.unit": "Unit",
    "zone.perNight": "/night",
    "zone.perPerson": "/person/night",
    
    // Booking
    "booking.title": "Booking Cart",
    "booking.empty": "No bookings yet",
    "booking.emptyHint": "Select a zone and dates from the left",
    "booking.items": "items",
    "booking.checkout": "Proceed to Checkout",
    "booking.addMore": "You can add more accommodations before checkout",
    "booking.total": "Total",
    "booking.nights": "nights",
    "booking.guests": "guests",
    "booking.bookZone": "Book this zone",
    "booking.selectDate": "Check-in Date",
    "booking.selectDatePlaceholder": "Select check-in - check-out",
    "booking.guestCount": "Number of Guests",
    "booking.bookNow": "Book this zone",
    "booking.totalPrice": "Total Price",
    "booking.added": "Added {name} to booking",
    "booking.selectDateError": "Please select check-in and check-out dates",
    
    // Reviews
    "reviews.title": "Guest Reviews",
    "reviews.helpful": "Helpful",
    "reviews.loadMore": "Load More Reviews",
    "reviews.noMore": "No more reviews",
    
    // Calendar Legend
    "calendar.available": "Available (more than 3 slots)",
    "calendar.limited": "Limited (1-3 slots)",
    "calendar.full": "Fully booked",
    
    // Common
    "common.back": "Back",
    "common.share": "Share",
    "common.save": "Save",
    "common.loading": "Loading...",
    "common.photos": "photos",
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "th";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
