import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === "th" ? "en" : "th");
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 text-sm font-medium"
    >
      <Globe className="h-4 w-4" />
      <span>{language === "th" ? "EN" : "TH"}</span>
    </Button>
  );
};

export default LanguageSwitcher;
