import { Building2, Menu, Moon, Search, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" data-testid="logo-icon" />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground" data-testid="text-logo">Made in Algeria</h1>
              <p className="text-xs text-muted-foreground">صنع في الجزائر</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" data-testid="button-home">الرئيسية</Button>
            <Button variant="ghost" size="sm" data-testid="button-factories">المصانع</Button>
            <Button variant="ghost" size="sm" data-testid="button-categories">القطاعات</Button>
            <Button variant="ghost" size="sm" data-testid="button-about">من نحن</Button>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setDarkMode(!darkMode)}
              data-testid="button-theme-toggle"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            
            <Button variant="default" size="sm" className="hidden sm:inline-flex" data-testid="button-login">
              تسجيل الدخول
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border" data-testid="mobile-menu">
            <nav className="flex flex-col gap-2">
              <Button variant="ghost" className="justify-start" data-testid="button-mobile-home">الرئيسية</Button>
              <Button variant="ghost" className="justify-start" data-testid="button-mobile-factories">المصانع</Button>
              <Button variant="ghost" className="justify-start" data-testid="button-mobile-categories">القطاعات</Button>
              <Button variant="ghost" className="justify-start" data-testid="button-mobile-about">من نحن</Button>
              <Button variant="default" className="justify-start mt-2" data-testid="button-mobile-login">تسجيل الدخول</Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
