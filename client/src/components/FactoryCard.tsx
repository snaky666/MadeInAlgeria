import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

interface FactoryCardProps {
  id: string;
  name: string;
  category: string;
  wilaya: string;
  description: string;
  image: string;
  phone?: string;
  email?: string;
}

export default function FactoryCard({
  id,
  name,
  category,
  wilaya,
  description,
  image,
  phone,
  email,
}: FactoryCardProps) {
  return (
    <Card className="overflow-hidden hover-elevate active-elevate-2 flex flex-col h-full" data-testid={`card-factory-${id}`}>
      <div className="relative h-48 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground" data-testid={`badge-category-${id}`}>
          {category}
        </Badge>
      </div>
      
      <CardContent className="flex-1 p-4">
        <h3 className="font-bold text-xl mb-2" data-testid={`text-factory-name-${id}`}>{name}</h3>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span data-testid={`text-wilaya-${id}`}>{wilaya}</span>
        </div>
        
        <p className="text-sm text-foreground/80 line-clamp-2 mb-4" data-testid={`text-description-${id}`}>
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {phone && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Phone className="h-3 w-3" />
              <span data-testid={`text-phone-${id}`}>{phone}</span>
            </div>
          )}
          {email && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Mail className="h-3 w-3" />
              <span data-testid={`text-email-${id}`}>{email}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button className="w-full" variant="outline" data-testid={`button-view-details-${id}`}>
          <ExternalLink className="ml-2 h-4 w-4" />
          عرض التفاصيل
        </Button>
      </CardFooter>
    </Card>
  );
}
