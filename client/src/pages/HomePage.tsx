import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";
import CategoriesSection from "@/components/CategoriesSection";
import FeaturedFactories from "@/components/FeaturedFactories";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsSection />
        <CategoriesSection />
        <FeaturedFactories />
      </main>
      <Footer />
    </div>
  );
}
