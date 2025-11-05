import { Menu, Moon, Sun, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-3">
            <img 
              src="/logo.jpg" 
              alt="Made in Algeria Logo" 
              className="h-12 w-12 object-contain mix-blend-lighten" 
              data-testid="logo-icon" 
            />
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground" data-testid="text-logo">Made in Algeria</h1>
              <p className="text-xs text-muted-foreground">صنع في الجزائر</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" data-testid="button-home">الرئيسية</Button>
            <Button variant="ghost" size="sm" data-testid="button-factories">المصانع</Button>
            <Button variant="ghost" size="sm" data-testid="button-categories">القطاعات</Button>
            {isAdmin && (
              <Button variant="ghost" size="sm" data-testid="button-admin">
                لوحة الإدارة
              </Button>
            )}
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
            
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Avatar className="h-8 w-8" data-testid="avatar-user">
                  <AvatarImage src={user?.profileImageUrl || undefined} />
                  <AvatarFallback>
                    {user?.firstName?.[0] || user?.email?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleLogout}
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 ml-2" />
                  خروج
                </Button>
              </div>
            ) : (
              <Button 
                variant="default" 
                size="sm" 
                className="hidden sm:inline-flex" 
                onClick={handleLogin}
                data-testid="button-login"
              >
                تسجيل الدخول
              </Button>
            )}

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
              {isAdmin && (
                <Button variant="ghost" className="justify-start" data-testid="button-mobile-admin">
                  لوحة الإدارة
                </Button>
              )}
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  className="justify-start mt-2" 
                  onClick={handleLogout}
                  data-testid="button-mobile-logout"
                >
                  <LogOut className="h-4 w-4 ml-2" />
                  خروج
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  className="justify-start mt-2" 
                  onClick={handleLogin}
                  data-testid="button-mobile-login"
                >
                  تسجيل الدخول
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
