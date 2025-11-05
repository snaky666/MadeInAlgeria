import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  count: number;
  icon: LucideIcon;
  image: string;
}

export default function CategoryCard({ name, count, icon: Icon, image }: CategoryCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all" data-testid={`card-category-${name}`}>
      <div className="relative h-32 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 right-3">
          <Icon className="h-8 w-8 text-white" />
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-1" data-testid={`text-category-name-${name}`}>{name}</h3>
        <p className="text-sm text-muted-foreground" data-testid={`text-category-count-${name}`}>
          {count} مصنع
        </p>
      </CardContent>
    </Card>
  );
}
