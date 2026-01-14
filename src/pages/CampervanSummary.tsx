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
import { Calendar, Shield, Package, Check } from "lucide-react";
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

  const basePrice = 3000; // Base price per day
  const days = 3;
  const baseTotal = basePrice * days;
  const addonsTotal = calculateAddonsTotal() * days;
  const insuranceTotal = getInsurancePrice() * days;
  const totalPrice = baseTotal + addonsTotal + insuranceTotal;

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    console.log("Selected addons:", selectedAddons);
    console.log("Selected insurance:", selectedInsurance);
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <h1 className="text-3xl font-bold">ยืนยันการจองรถบ้าน</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Add-ons Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
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
                  <CardTitle className="flex items-center gap-2">
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
                  <CardTitle>ข้อมูลผู้เช่า</CardTitle>
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
                  <CardTitle>ข้อมูลคนขับและผู้โดยสาร</CardTitle>
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

              {/* Payment Details */}
              <Card>
                <CardHeader>
                  <CardTitle>ข้อมูลการชำระเงิน</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>หมายเลขบัตร</Label>
                      <Input {...register("cardNumber")} required />
                    </div>
                    <div>
                      <Label>รหัส CVV</Label>
                      <Input type="password" maxLength={4} {...register("cvv")} required />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>ชื่อบนบัตร</Label>
                      <Input {...register("cardName")} required />
                    </div>
                    <div>
                      <Label>วันหมดอายุ</Label>
                      <Input placeholder="MM/YY" {...register("expiryDate")} required />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms & Conditions */}
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" {...register("terms")} />
                <Label htmlFor="terms">
                  ฉันได้อ่านและยอมรับข้อกำหนดและเงื่อนไข
                </Label>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
                  ยืนยันการจอง
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(-1)}
                >
                  ยกเลิก
                </Button>
              </div>
            </form>
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>สรุปการจอง</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">รถบ้านที่เลือก</h3>
                  <p className="text-muted-foreground">Motorhome Premium</p>
                </div>
                <div>
                  <h3 className="font-medium">วันรับรถ</h3>
                  <p className="text-muted-foreground">กรุงเทพฯ</p>
                  <p className="text-muted-foreground">จันทร์, 15 เม.ย. 2567</p>
                </div>
                <div>
                  <h3 className="font-medium">วันคืนรถ</h3>
                  <p className="text-muted-foreground">เชียงใหม่</p>
                  <p className="text-muted-foreground">พุธ, 17 เม.ย. 2567</p>
                </div>
                
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>ค่าเช่ารถ ({days} วัน)</span>
                    <span>฿{baseTotal.toLocaleString()}</span>
                  </div>
                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>Add-ons ({days} วัน)</span>
                      <span>฿{addonsTotal.toLocaleString()}</span>
                    </div>
                  )}
                  {insuranceTotal > 0 && (
                    <div className="flex justify-between text-sm">
                      <span>ประกันภัย ({days} วัน)</span>
                      <span>฿{insuranceTotal.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-medium text-lg pt-2 border-t">
                    <span>รวมทั้งหมด</span>
                    <span className="text-primary">฿{totalPrice.toLocaleString()}</span>
                  </div>
                </div>
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