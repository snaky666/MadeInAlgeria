import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Layers } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export default function StatsSection() {
  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    queryFn: async () => {
      const response = await fetch("/api/stats");
      if (!response.ok) throw new Error("Failed to fetch stats");
      return response.json();
    },
  });

  const displayStats = [
    {
      icon: Building2,
      value: stats?.totalFactories || 0,
      label: "مصنع مسجل",
      color: "text-primary",
    },
    {
      icon: MapPin,
      value: stats?.totalWilayas || 0,
      label: "ولاية مغطاة",
      color: "text-chart-2",
    },
    {
      icon: Layers,
      value: stats?.totalCategories || 0,
      label: "قطاع صناعي",
      color: "text-chart-4",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-stats-title">
            Made in Algeria بالأرقام
          </h2>
          <p className="text-muted-foreground text-lg" data-testid="text-stats-subtitle">
            منصة رائدة لربط المصانع الجزائرية بالزبائن
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayStats.map((stat, index) => (
            <Card key={index} className="hover-elevate" data-testid={`card-stat-${index}`}>
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                <div className="text-3xl md:text-4xl font-bold mb-2" data-testid={`text-stat-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
