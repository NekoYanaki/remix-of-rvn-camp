
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import SearchResults from "./pages/SearchResults";
import Booking from "./pages/Booking";
import BookingSummary from "./pages/BookingSummary";
import Profile from "./pages/Profile";
import ManageTrip from "./pages/ManageTrip";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import PartnerLogin from "./pages/PartnerLogin";
import PartnerRegistration from "./pages/PartnerRegistration";
import TravelGuide from "./pages/TravelGuide";
import Contact from "./pages/Contact";
import BookCampsite from "./pages/BookCampsite";
import CampsiteDetails from "./pages/CampsiteDetails";
import CustomerDetails from "./pages/CustomerDetails";
import PaymentSummary from "./pages/PaymentSummary";
import NotFound from "./pages/NotFound";
import BookMotorhome from "./pages/BookMotorhome";
import SearchHotels from "./pages/SearchHotels";
import HotelsCalculator from "./pages/HotelsCalculator";
import MotorhomeResults from "./pages/MotorhomeResults";
import MotorhomeCalculator from "./pages/MotorhomeCalculator";
import MotorhomeDetail from "./pages/MotorhomeDetail";
import Download from "./pages/Download";
import RentCampervan from "./pages/RentCampervan";
import CampervanDetail from "./pages/CampervanDetail";
import MotorhomeSummary from "./pages/MotorhomeSummary";
import CampervanSummary from "./pages/CampervanSummary";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking-summary" element={<BookingSummary />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/manage-trip" element={<ManageTrip />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/partner/login" element={<PartnerLogin />} />
            <Route path="/partner/register" element={<PartnerRegistration />} />
            <Route path="/travel-guide" element={<TravelGuide />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/book-campsite" element={<BookCampsite />} />
            <Route path="/campsite/:id" element={<CampsiteDetails />} />
            <Route path="/customer-details" element={<CustomerDetails />} />
            <Route path="/payment-summary" element={<PaymentSummary />} />
            <Route path="/book-motorhome" element={<BookMotorhome />} />
            <Route path="/search-campsite" element={<SearchHotels />} />
            <Route path="/hotels-calculator" element={<HotelsCalculator />} />
            <Route path="/motorhome-results" element={<MotorhomeResults />} />
            <Route path="/motorhome-calculator" element={<MotorhomeCalculator />} />
            <Route path="/motorhome-detail" element={<MotorhomeDetail />} />
            <Route path="/download" element={<Download />} />
            <Route path="/rent-campervan" element={<RentCampervan />} />
            <Route path="/campervan-detail" element={<CampervanDetail />} />
            <Route path="/motorhome-summary" element={<MotorhomeSummary />} />
            <Route path="/campervan-summary" element={<CampervanSummary />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
