
import { Link, useNavigate } from "react-router-dom";
import { Menu, Globe } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useLanguage } from "@/contexts/LanguageContext";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/185d641b-79c4-4ff4-8a62-6492f5109a4e.png" 
            alt="RVnCamp Logo" 
            className="h-8"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-auto hidden items-center space-x-4 lg:flex lg:space-x-6">
          <Link
            to="/"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.home")}
          </Link>
          <Link
            to="/manage-trip"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {language === "th" ? "จัดการทริป" : "Manage Your Trip"}
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.contact")}
          </Link>
          <Link
            to="/travel-guide"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            {t("nav.guide")}
          </Link>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  {language === "en" ? "ENG" : "ไทย"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white z-50">
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  <Globe className="h-4 w-4 mr-2" />
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("th")}>
                  <Globe className="h-4 w-4 mr-2" />
                  ไทย
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link to="/login">
              <Button variant="default" size="sm">
                {t("nav.login")}
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="ml-auto flex items-center lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-8 w-8" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>
                  <img 
                    src="/lovable-uploads/185d641b-79c4-4ff4-8a62-6492f5109a4e.png" 
                    alt="RVnCamp Logo" 
                    className="h-8"
                  />
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col space-y-4">
                <Link
                  to="/"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {t("nav.home")}
                </Link>
                <Link
                  to="/manage-trip"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {language === "th" ? "จัดการทริป" : "Manage Your Trip"}
                </Link>
                <Link
                  to="/contact"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {t("nav.contact")}
                </Link>
                <Link
                  to="/travel-guide"
                  className="text-lg font-medium transition-colors hover:text-primary"
                >
                  {t("nav.guide")}
                </Link>
                <div className="flex flex-col space-y-4 pt-4 border-t">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex items-center gap-2 justify-start">
                        <Globe className="h-4 w-4" />
                        {language === "en" ? "ENG" : "ไทย"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-white z-50">
                      <DropdownMenuItem onClick={() => setLanguage("en")}>
                        <Globe className="h-4 w-4 mr-2" />
                        English
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setLanguage("th")}>
                        <Globe className="h-4 w-4 mr-2" />
                        ไทย
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Link to="/login">
                    <Button variant="default" size="sm" className="w-full">
                      {t("nav.login")}
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
