import { Building2, Mail, MapPin, Phone } from "lucide-react";
import { SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-6 w-6 text-primary" />
              <h3 className="font-bold text-lg" data-testid="text-footer-logo">Made in Algeria</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4" data-testid="text-footer-description">
              منصة وطنية لربط المصانع الجزائرية بالزبائن في جميع أنحاء الوطن
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-facebook">
                <SiFacebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-instagram">
                <SiInstagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-linkedin">
                <SiLinkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="text-quick-links-title">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-about">من نحن</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-how-it-works">كيف يعمل</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-pricing">الأسعار</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-faq">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="text-categories-title">القطاعات</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-food">صناعة غذائية</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-textile">صناعة النسيج</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-chemical">صناعة كيميائية</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-mechanical">صناعة ميكانيكية</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4" data-testid="text-contact-title">تواصل معنا</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span data-testid="text-address">الجزائر العاصمة، الجزائر</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span data-testid="text-phone">+213 (0) 550 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span data-testid="text-email">contact@madeinalgeria.dz</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground" data-testid="text-copyright">
              © 2025 Made in Algeria. جميع الحقوق محفوظة.
            </p>
            <div className="flex gap-4 text-sm">
              <a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-privacy">سياسة الخصوصية</a>
              <a href="#" className="text-muted-foreground hover:text-foreground" data-testid="link-terms">شروط الاستخدام</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
