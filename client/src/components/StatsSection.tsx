import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Layers, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "250+",
    label: "مصنع مسجل",
    color: "text-primary",
  },
  {
    icon: MapPin,
    value: "48",
    label: "ولاية مغطاة",
    color: "text-chart-2",
  },
  {
    icon: Layers,
    value: "12",
    label: "قطاع صناعي",
    color: "text-chart-4",
  },
  {
    icon: TrendingUp,
    value: "1500+",
    label: "استفسار شهري",
    color: "text-chart-5",
  },
];

export default function StatsSection() {
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
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
