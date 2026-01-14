import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { 
  Calendar, 
  Shield, 
  Package, 
  Check, 
  Users, 
  Bed, 
  MapPin, 
  Tag,
  Sparkles,
  CreditCard,
  ArrowLeft,
  Clock,
  ChevronDown,
  X,
  Trash2,
  Info,
  Car,
  Fuel,
  Settings,
  Gauge
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for addons - based on provided image
const mockAddons = [
  { id: "gps", name: "GPS นำทาง", price: 200 },
  { id: "baby-seat", name: "เบาะนั่งเด็ก", price: 300 },
  { id: "wifi", name: "WiFi Router", price: 150 },
  { id: "camping-set", name: "อุปกรณ์แคมปิ้ง", price: 500 },
  { id: "bbq", name: "ชุดปิ้งย่าง", price: 350 },
  { id: "sunshade", name: "กันสาด", price: 400 },
  { id: "generator", name: "เครื่องปั่นไฟ", price: 600 },
  { id: "outdoor-table", name: "โต๊ะกลางแจ้ง", price: 200 },
  { id: "folding-chairs", name: "เก้าอี้พับ (ชุด)", price: 150 },
  { id: "bike-rack", name: "แร็คจักรยาน", price: 250 },
];

const mockInsuranceOptions = [
  { 
    id: "basic", 
    name: "ประกันพื้นฐาน", 
    price: 0, 
    description: "ความคุ้มครองพื้นฐาน",
    details: [
      "คุ้มครองบุคคลที่สาม สูงสุด 1,000,000 บาท",
      "คุ้มครองการเสียชีวิตของผู้ขับขี่ 100,000 บาท",
      "ไม่คุ้มครองความเสียหายของตัวรถ",
      "ค่าเสียหายส่วนแรก 20,000 บาท"
    ]
  },
  { 
    id: "standard", 
    name: "ประกันมาตรฐาน", 
    price: 300, 
    description: "ความคุ้มครองเพิ่มเติม",
    details: [
      "คุ้มครองบุคคลที่สาม สูงสุด 2,000,000 บาท",
      "คุ้มครองตัวรถ สูงสุด 500,000 บาท",
      "คุ้มครองอุบัติเหตุส่วนบุคคล 200,000 บาท",
      "ค่าเสียหายส่วนแรก 10,000 บาท",
      "บริการช่วยเหลือฉุกเฉิน 24 ชม."
    ]
  },
  { 
    id: "premium", 
    name: "ประกันพรีเมียม", 
    price: 500, 
    description: "ความคุ้มครองเต็มรูปแบบ",
    details: [
      "คุ้มครองบุคคลที่สาม สูงสุด 5,000,000 บาท",
      "คุ้มครองตัวรถเต็มมูลค่า",
      "คุ้มครองอุบัติเหตุส่วนบุคคล 500,000 บาท",
      "ไม่มีค่าเสียหายส่วนแรก",
      "บริการช่วยเหลือฉุกเฉิน 24 ชม.",
      "รถยนต์ทดแทนกรณีซ่อมนาน",
      "คุ้มครองภัยธรรมชาติ"
    ]
  },
];

// Mock motorhome data (similar to MotorhomeDetail page)
const mockMotorhomeData = {
  id: "1",
  name: "Caravan",
  brand: "Mitsubishi",
  model: "Triton",
  image: "/lovable-uploads/motorhome-main.jpg",
  specs: {
    passengers: 4,
    beds: 2,
    transmission: "อัตโนมัติ",
    fuelType: "ดีเซล",
    year: 2023,
    engine: "2.8L"
  },
  amenities: ["Shower", "Toilet", "Kitchen", "AC", "TV", "Solar panel"],
  pricing: {
    basePrice: 12000,
    deposit: 10000
  }
};

const CampervanSummary = () => {
  const navigate = useNavigate();
  
  // State for addons and insurance
  const [selectedAddons, setSelectedAddons] = useState<{id: string; name: string; price: number}[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState("basic");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [paymentOption, setPaymentOption] = useState("full");
  const [addonPopoverOpen, setAddonPopoverOpen] = useState(false);
  const [insuranceModalOpen, setInsuranceModalOpen] = useState(false);
  const [selectedInsuranceForModal, setSelectedInsuranceForModal] = useState<typeof mockInsuranceOptions[0] | null>(null);

  const handleAddAddon = (addon: typeof mockAddons[0]) => {
    if (!selectedAddons.find(a => a.id === addon.id)) {
      setSelectedAddons(prev => [...prev, addon]);
    }
    setAddonPopoverOpen(false);
  };

  const handleRemoveAddon = (addonId: string) => {
    setSelectedAddons(prev => prev.filter(a => a.id !== addonId));
  };

  const calculateAddonsTotal = () => {
    return selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  };

  const getInsurancePrice = () => {
    const insurance = mockInsuranceOptions.find(opt => opt.id === selectedInsurance);
    return insurance?.price || 0;
  };

  const openInsuranceModal = (insurance: typeof mockInsuranceOptions[0]) => {
    setSelectedInsuranceForModal(insurance);
    setInsuranceModalOpen(true);
  };

  const days = 1;
  const basePrice = mockMotorhomeData.pricing.basePrice;
  const addonsTotal = calculateAddonsTotal() * days;
  const insuranceTotal = getInsurancePrice() * days;
  const totalPrice = basePrice + addonsTotal + insuranceTotal;
  const depositAmount = Math.round(totalPrice * 0.2);

  const referenceNumber = `${Date.now()}`;

  const availableAddons = mockAddons.filter(
    addon => !selectedAddons.find(a => a.id === addon.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            className="mb-2 -ml-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            ย้อนกลับ
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Booking Summary</h1>
          <p className="text-sm text-gray-500">Reference: {referenceNumber}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Motorhome Card - Enhanced */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-bold">Selected Motorhome</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Vehicle Image */}
                  <div className="w-full md:w-56 h-40 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0 border">
                    <img 
                      src={mockMotorhomeData.image}
                      alt={mockMotorhomeData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Vehicle Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{mockMotorhomeData.name}</h3>
                        <p className="text-sm text-gray-500">{mockMotorhomeData.brand} {mockMotorhomeData.model}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {mockMotorhomeData.specs.passengers}
                          </span>
                          <span className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            {mockMotorhomeData.specs.beds}
                          </span>
                        </div>
                        
                        {/* Additional specs */}
                        <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">
                          <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                            <Settings className="h-3 w-3" />
                            {mockMotorhomeData.specs.transmission}
                          </span>
                          <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                            <Fuel className="h-3 w-3" />
                            {mockMotorhomeData.specs.fuelType}
                          </span>
                          <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                            <Gauge className="h-3 w-3" />
                            {mockMotorhomeData.specs.engine}
                          </span>
                          <span className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                            <Car className="h-3 w-3" />
                            {mockMotorhomeData.specs.year}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Tag className="h-3 w-3" />
                          Price
                        </div>
                        <p className="text-2xl font-bold text-red-500">{basePrice.toLocaleString()} THB</p>
                      </div>
                    </div>

                    {/* Amenities preview */}
                    <div className="mt-3 pt-3 border-t">
                      <div className="flex flex-wrap gap-2">
                        {mockMotorhomeData.amenities.slice(0, 6).map((amenity, idx) => (
                          <span key={idx} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
                            <Check className="h-3 w-3" />
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pickup / Dropoff Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      Pick-up
                    </div>
                    <p className="font-bold text-gray-900 text-lg">14 Jan 2026, 10:00</p>
                    <div className="flex items-start gap-1 mt-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600">TKD Fiber Co.,Ltd (CARRYBOY แคร์รี่บอย)</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      Drop-off
                    </div>
                    <p className="font-bold text-gray-900 text-lg">15 Jan 2026</p>
                    <div className="flex items-start gap-1 mt-2">
                      <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-600">TKD Fiber Co.,Ltd (CARRYBOY แคร์รี่บอย)</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <Clock className="h-4 w-4" />
                      Day
                    </div>
                    <p className="font-bold text-gray-900 text-lg">{days}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Add-ons Section - Dropdown style */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Package className="h-5 w-5 text-primary" />
                  Add-on & Accessories
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  เลือกอุปกรณ์เสริมที่ต้องการ
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Dropdown for selecting addons */}
                <Popover open={addonPopoverOpen} onOpenChange={setAddonPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between bg-white hover:bg-red-50 text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
                    >
                      <span>ค้นหา Add-on & Accessories...</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0 bg-white border-red-200" align="start">
                    <Command className="bg-white">
                      <CommandInput placeholder="ค้นหา Add-on..." className="border-red-100" />
                      <CommandList className="bg-white">
                        <CommandEmpty>ไม่พบ Add-on</CommandEmpty>
                        <CommandGroup>
                          {availableAddons.map(addon => (
                            <CommandItem
                              key={addon.id}
                              value={addon.name}
                              onSelect={() => handleAddAddon(addon)}
                              className="cursor-pointer hover:bg-red-50 data-[selected=true]:bg-red-50 data-[selected=true]:text-red-700"
                            >
                              <span>{addon.name} (฿{addon.price.toLocaleString()})</span>
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>

                {/* Selected addons list */}
                {selectedAddons.length > 0 && (
                  <div className="space-y-2">
                    {selectedAddons.map(addon => (
                      <div 
                        key={addon.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                      >
                        <span className="font-medium">{addon.name}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600">฿ {addon.price.toLocaleString()}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={() => handleRemoveAddon(addon.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Total addons */}
                    <div className="flex justify-between items-center pt-2 border-t mt-2">
                      <span className="text-gray-600">รวม Add-on</span>
                      <span className="font-bold text-red-500">฿{addonsTotal.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Insurance Section - with modal details */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                  ประกันภัย
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  เลือกแผนประกันที่เหมาะกับคุณ
                </p>
              </CardHeader>
              <CardContent>
                <RadioGroup value={selectedInsurance} onValueChange={setSelectedInsurance}>
                  <div className="space-y-3">
                    {mockInsuranceOptions.map(option => (
                      <div 
                        key={option.id} 
                        className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedInsurance === option.id 
                            ? 'border-green-500 bg-green-50' 
                            : 'hover:border-gray-400'
                        }`}
                        onClick={() => setSelectedInsurance(option.id)}
                      >
                        <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                        <div className="flex-1">
                          <Label htmlFor={option.id} className="font-medium cursor-pointer flex items-center gap-2">
                            {option.name}
                            {option.price === 0 && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                                รวมแล้ว
                              </span>
                            )}
                          </Label>
                          <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                          <Button
                            variant="link"
                            className="p-0 h-auto text-blue-600 hover:text-blue-700 text-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              openInsuranceModal(option);
                            }}
                          >
                            <Info className="h-3 w-3 mr-1" />
                            ดูรายละเอียด
                          </Button>
                        </div>
                        <span className="text-sm font-medium">
                          {option.price === 0 ? "ฟรี" : `+฿${option.price.toLocaleString()}/วัน`}
                        </span>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Terms & Conditions */}
            <div className="flex items-center space-x-2 bg-white p-4 rounded-lg border">
              <Checkbox 
                id="terms" 
                checked={termsAccepted}
                onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              />
              <Label htmlFor="terms" className="cursor-pointer text-sm">
                ฉันได้อ่านและยอมรับ<span className="text-blue-600 underline">ข้อกำหนดและเงื่อนไข</span>
              </Label>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Promotion Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Promotion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter promo code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">Add</Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary Card */}
            <Card className="sticky top-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Tag className="h-4 w-4" />
                    ค่าเช่ารถ ({days} วัน)
                  </span>
                  <span className="font-medium">{basePrice.toLocaleString()} THB</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Sparkles className="h-4 w-4" />
                    Add-ons
                  </span>
                  <span className="font-medium">{addonsTotal.toLocaleString()} THB</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Shield className="h-4 w-4" />
                    ประกันภัย
                  </span>
                  <span className="font-medium">{insuranceTotal.toLocaleString()} THB</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t">
                  <span className="flex items-center gap-2 text-red-500 font-semibold">
                    <CreditCard className="h-4 w-4" />
                    Total
                  </span>
                  <span className="text-xl font-bold text-red-500">{totalPrice.toLocaleString()} THB</span>
                </div>

                {/* Payment Options */}
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-3">เลือกวิธีชำระเงิน</p>
                  <RadioGroup value={paymentOption} onValueChange={setPaymentOption} className="space-y-2">
                    <div 
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        paymentOption === 'full' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'
                      }`}
                      onClick={() => setPaymentOption('full')}
                    >
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full" className="cursor-pointer flex-1">
                        <span className="font-medium block">ชำระเต็มจำนวน</span>
                        <span className="text-lg font-bold text-primary">{totalPrice.toLocaleString()} THB</span>
                      </Label>
                    </div>
                    <div 
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        paymentOption === 'deposit' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'
                      }`}
                      onClick={() => setPaymentOption('deposit')}
                    >
                      <RadioGroupItem value="deposit" id="deposit" />
                      <Label htmlFor="deposit" className="cursor-pointer flex-1">
                        <span className="font-medium block">ชำระมัดจำ (20%)</span>
                        <span className="text-lg font-bold text-primary">{depositAmount.toLocaleString()} THB</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* Pay Now Button */}
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white mt-4"
                  disabled={!termsAccepted}
                  onClick={() => navigate('/payment-summary')}
                >
                  Pay Now ({paymentOption === 'full' ? totalPrice.toLocaleString() : depositAmount.toLocaleString()} THB)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />

      {/* Insurance Detail Modal */}
      <Dialog open={insuranceModalOpen} onOpenChange={setInsuranceModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              {selectedInsuranceForModal?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">{selectedInsuranceForModal?.description}</p>
            <div className="space-y-2">
              <h4 className="font-medium">รายละเอียดความคุ้มครอง:</h4>
              <ul className="space-y-2">
                {selectedInsuranceForModal?.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">ราคา</span>
                <span className="text-xl font-bold text-green-600">
                  {selectedInsuranceForModal?.price === 0 ? "ฟรี" : `฿${selectedInsuranceForModal?.price.toLocaleString()}/วัน`}
                </span>
              </div>
            </div>
            <Button 
              className="w-full"
              onClick={() => {
                if (selectedInsuranceForModal) {
                  setSelectedInsurance(selectedInsuranceForModal.id);
                }
                setInsuranceModalOpen(false);
              }}
            >
              เลือกแผนนี้
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CampervanSummary;
