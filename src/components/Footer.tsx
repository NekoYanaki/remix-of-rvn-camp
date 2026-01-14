import { Facebook, Instagram, MessageCircle, Home, Users, Info } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#2a2a2a]">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Main Menu */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Home className="h-4 w-4 text-gray-400" />
              <h3 className="text-sm font-medium text-white italic">Main Menu</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/rent-campervan" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  Campervan Rentals
                </Link>
              </li>
              <li>
                <Link 
                  to="/book-campsite" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  Campsites
                </Link>
              </li>
              <li>
                <Link 
                  to="/manage-trip" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  My Trips
                </Link>
              </li>
            </ul>
          </div>

          {/* For Partners */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-gray-400" />
              <h3 className="text-sm font-medium text-white italic">For Partners</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://preview--camp-partner-portal.lovable.app/"
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  Partner Registration
                </a>
              </li>
            </ul>
          </div>

          {/* General Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-4 w-4 text-gray-400" />
              <h3 className="text-sm font-medium text-white italic">General Info</h3>
            </div>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-white mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors duration-300"
                aria-label="Message"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Notice */}
      <div className="border-t border-gray-700">
        <div className="container py-6">
          <p className="text-center text-sm text-gray-500">
            © 2025 RVnCamp. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
