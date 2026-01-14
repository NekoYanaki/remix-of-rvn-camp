import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm } from "react-hook-form";
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
  Clock
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Mock data for addons and insurance
const mockAddons = [
  { id: "gps", name: "GPS นำทาง", price: 200, description: "ระบบนำทาง GPS ภาษาไทย" },
  { id: "camping-set", name: "ชุดแคมป์ปิ้ง", price: 500, description: "เต็นท์ ถุงนอน และอุปกรณ์แคมป์ปิ้งครบชุด" },
  { id: "baby-seat", name: "เบาะนั่งเด็ก", price: 300, description: "เบาะนั่งเด็กมาตรฐานความปลอดภัย" },
  { id: "extra-driver", name: "คนขับเพิ่มเติม", price: 400, description: "เพิ่มคนขับเพิ่มเติม 1 คน" },
];

const mockInsuranceOptions = [
  { id: "basic", name: "ประกันพื้นฐาน", price: 0, description: "ความคุ้มครองพื้นฐาน", coverage: "คุ้มครองบุคคลที่สาม" },
  { id: "standard", name: "ประกันมาตรฐาน", price: 300, description: "ความคุ้มครองเพิ่มเติม", coverage: "คุ้มครองรถยนต์และบุคคลที่สาม" },
  { id: "premium", name: "ประกันพรีเมียม", price: 500, description: "ความคุ้มครองเต็มรูปแบบ", coverage: "คุ้มครองครบทุกกรณี ไม่มีค่าเสียหายส่วนแรก" },
];

const CampervanSummary = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, watch } = useForm();
  const hasFlightDetails = watch("hasFlightDetails", "no");
  
  // State for addons and insurance
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedInsurance, setSelectedInsurance] = useState("basic");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [paymentOption, setPaymentOption] = useState("full");

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons(prev => 
      prev.includes(addonId) 
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  const calculateAddonsTotal = () => {
    return mockAddons
      .filter(addon => selectedAddons.includes(addon.id))
      .reduce((sum, addon) => sum + addon.price, 0);
  };

  const getInsurancePrice = () => {
    const insurance = mockInsuranceOptions.find(opt => opt.id === selectedInsurance);
    return insurance?.price || 0;
  };

  const basePrice = 12000; // Base price total
  const days = 1;
  const addonsTotal = calculateAddonsTotal() * days;
  const insuranceTotal = getInsurancePrice() * days;
  const totalPrice = basePrice + addonsTotal + insuranceTotal;
  const depositAmount = Math.round(totalPrice * 0.2);

  const referenceNumber = `${Date.now()}`;

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    console.log("Selected addons:", selectedAddons);
    console.log("Selected insurance:", selectedInsurance);
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Booking Summary</h1>
          <p className="text-sm text-gray-500">Reference: {referenceNumber}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Motorhome Card */}
            <Card className="overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Selected Motorhome</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Vehicle Image */}
                  <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                      src="/lovable-uploads/motorhome-main.jpg" 
                      alt="Caravan"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Vehicle Info */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Caravan</h3>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            4
                          </span>
                          <span className="flex items-center gap-1">
                            <Bed className="h-4 w-4" />
                            2
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Tag className="h-3 w-3" />
                          Price
                        </div>
                        <p className="text-xl font-bold text-red-500">{basePrice.toLocaleString()} THB</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pickup / Dropoff Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <Calendar className="h-3 w-3" />
                      Pick-up
                    </div>
                    <p className="font-semibold text-gray-900">14 Jan 2026, 10:00</p>
                    <div className="flex items-start gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-500">TKD Fiber Co.,Ltd (CARRYBOY แคร์รี่บอย)</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <Calendar className="h-3 w-3" />
                      Drop-off
                    </div>
                    <p className="font-semibold text-gray-900">15 Jan 2026</p>
                    <div className="flex items-start gap-1 mt-1">
                      <MapPin className="h-3 w-3 text-gray-400 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-gray-500">TKD Fiber Co.,Ltd (CARRYBOY แคร์รี่บอย)</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                      <Clock className="h-3 w-3" />
                      Day
                    </div>
                    <p className="font-semibold text-gray-900">{days}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Add-ons Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Package className="h-5 w-5 text-primary" />
                    Add-ons เพิ่มเติม
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    เลือกอุปกรณ์เสริมที่ต้องการ
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockAddons.map(addon => (
                      <div 
                        key={addon.id} 
                        className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedAddons.includes(addon.id) 
                            ? 'border-primary bg-primary/5' 
                            : 'hover:border-gray-400'
                        }`}
                        onClick={() => handleAddonToggle(addon.id)}
                      >
                        <Checkbox
                          id={addon.id}
                          checked={selectedAddons.includes(addon.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <Label htmlFor={addon.id} className="font-medium cursor-pointer">
                            {addon.name}
                          </Label>
                          <p className="text-xs text-gray-500">{addon.description}</p>
                        </div>
                        <span className="text-sm font-medium text-primary">+฿{addon.price.toLocaleString()}/วัน</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Insurance Section */}
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
                            <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                              <Check className="h-3 w-3" />
                              {option.coverage}
                            </p>
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

              {/* Rental Details Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ข้อมูลผู้เช่า</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    กรอกข้อมูลของท่านเพื่อทำการจอง
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>คำนำหน้า</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือก" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mr">นาย</SelectItem>
                          <SelectItem value="ms">นางสาว</SelectItem>
                          <SelectItem value="mrs">นาง</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>ชื่อ</Label>
                      <Input {...register("firstName")} required />
                    </div>
                    <div>
                      <Label>นามสกุล</Label>
                      <Input {...register("lastName")} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>อีเมล</Label>
                      <Input type="email" {...register("email")} required />
                    </div>
                    <div>
                      <Label>เบอร์โทรศัพท์</Label>
                      <Input type="tel" {...register("phone")} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                      <Label>ที่อยู่</Label>
                      <Input {...register("address")} required />
                    </div>
                    <div>
                      <Label>จังหวัด</Label>
                      <Input {...register("city")} required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Driver & Passenger Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ข้อมูลคนขับและผู้โดยสาร</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>ชื่อ-นามสกุลคนขับ</Label>
                      <Input {...register("driverName")} required />
                    </div>
                    <div>
                      <Label>วันเกิด</Label>
                      <div className="relative">
                        <Input type="date" {...register("driverDob")} required />
                        <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>ประเทศที่ออกใบขับขี่</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกประเทศ" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="th">ประเทศไทย</SelectItem>
                          <SelectItem value="international">ใบขับขี่สากล</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>จำนวนผู้โดยสาร</Label>
                      <Input type="number" min="1" max="6" {...register("passengers")} required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms & Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                />
                <Label htmlFor="terms" className="cursor-pointer text-sm">
                  ฉันได้อ่านและยอมรับข้อกำหนดและเงื่อนไข
                </Label>
              </div>
            </form>
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
                  <Button variant="outline">Add Promotion</Button>
                </div>
              </CardContent>
            </Card>

            {/* Payment Summary Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Tag className="h-4 w-4" />
                    Base price
                  </span>
                  <span className="font-medium">{basePrice.toLocaleString()} THB</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Sparkles className="h-4 w-4" />
                    Extras
                  </span>
                  <span className="font-medium">{addonsTotal.toLocaleString()} THB</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2 text-gray-600">
                    <Shield className="h-4 w-4" />
                    Insurance
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

                <Button 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => navigate(-1)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to edit
                </Button>

                {/* Payment Options */}
                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-3">Select Payment Option</p>
                  <RadioGroup value={paymentOption} onValueChange={setPaymentOption} className="space-y-2">
                    <div 
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        paymentOption === 'full' ? 'border-primary bg-primary/5' : 'hover:border-gray-400'
                      }`}
                      onClick={() => setPaymentOption('full')}
                    >
                      <RadioGroupItem value="full" id="full" />
                      <Label htmlFor="full" className="cursor-pointer flex-1">
                        <span className="font-medium">Pay Full Amount</span>
                        <span className="ml-2 font-bold">{totalPrice.toLocaleString()} THB</span>
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
                        <span className="font-medium">Pay Deposit (20%)</span>
                        <span className="ml-2 font-bold">{depositAmount.toLocaleString()} THB</span>
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
    </div>
  );
};

export default CampervanSummary;
