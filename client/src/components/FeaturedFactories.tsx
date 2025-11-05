import FactoryCard from "./FactoryCard";
import { useQuery } from "@tanstack/react-query";
import type { Factory } from "@shared/schema";
import foodImage from "@assets/generated_images/Food_processing_factory_f7e8372e.png";

export default function FeaturedFactories() {
  const { data: factories = [], isLoading } = useQuery<Factory[]>({
    queryKey: ["/api/factories", { featured: true }],
    queryFn: async () => {
      const response = await fetch("/api/factories?featured=true");
      if (!response.ok) throw new Error("Failed to fetch factories");
      return response.json();
    },
  });

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-featured-title">
            المصانع المميزة
          </h2>
          <p className="text-muted-foreground text-lg" data-testid="text-featured-subtitle">
            تعرف على أبرز المصانع الجزائرية المسجلة في المنصة
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">جاري التحميل...</p>
          </div>
        ) : factories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">لا توجد مصانع مميزة حالياً</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {factories.map((factory) => (
              <FactoryCard 
                key={factory.id} 
                {...factory}
                image={factory.images?.[0] || foodImage}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
