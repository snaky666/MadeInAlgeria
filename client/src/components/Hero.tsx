import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import heroImage from "@assets/generated_images/Algerian_industrial_hero_landscape_f299335b.png";

const WILAYAS = [
  "الجزائر", "وهران", "قسنطينة", "سطيف", "عنابة", "تلمسان", "بجاية", "بسكرة"
];

const CATEGORIES = [
  "غذائي", "كيميائي", "نسيج", "ميكانيكي", "إلكتروني", "بناء", "خدمات"
];

export default function Hero() {
  return (
    <div className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4" data-testid="text-hero-title">
          اكتشف المصانع الجزائرية
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8" data-testid="text-hero-subtitle">
          دليلك الشامل للتواصل مع المصانع المحلية في جميع الولايات والقطاعات
        </p>

        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن مصنع..."
                className="pr-10 bg-white dark:bg-gray-900"
                data-testid="input-search"
              />
            </div>
            
            <Select>
              <SelectTrigger className="bg-white dark:bg-gray-900" data-testid="select-wilaya">
                <SelectValue placeholder="اختر الولاية" />
              </SelectTrigger>
              <SelectContent>
                {WILAYAS.map((wilaya) => (
                  <SelectItem key={wilaya} value={wilaya}>{wilaya}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="bg-white dark:bg-gray-900" data-testid="select-category">
                <SelectValue placeholder="اختر القطاع" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="w-full md:w-auto" size="lg" data-testid="button-search">
            <Search className="ml-2 h-5 w-5" />
            بحث
          </Button>

          <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
            <div className="text-center" data-testid="stat-factories">
              <div className="text-3xl font-bold text-white">250+</div>
              <div className="text-sm text-white/80">مصنع</div>
            </div>
            <div className="text-center" data-testid="stat-wilayas">
              <div className="text-3xl font-bold text-white">48</div>
              <div className="text-sm text-white/80">ولاية</div>
            </div>
            <div className="text-center" data-testid="stat-sectors">
              <div className="text-3xl font-bold text-white">12</div>
              <div className="text-sm text-white/80">قطاع</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
