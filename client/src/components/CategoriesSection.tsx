import CategoryCard from "./CategoryCard";
import { Package, Droplet, Shirt, Cog, Cpu, Building, Wrench } from "lucide-react";
import foodImage from "@assets/generated_images/Food_processing_factory_f7e8372e.png";
import textileImage from "@assets/generated_images/Textile_manufacturing_facility_6b7b136d.png";
import chemicalImage from "@assets/generated_images/Chemical_industrial_plant_f430d10c.png";
import mechanicalImage from "@assets/generated_images/Mechanical_manufacturing_workshop_e0c98248.png";
import electronicsImage from "@assets/generated_images/Electronics_manufacturing_facility_074020bc.png";
import constructionImage from "@assets/generated_images/Construction_materials_factory_ab9c6803.png";

const categories = [
  { name: "صناعة غذائية", count: 45, icon: Package, image: foodImage },
  { name: "صناعة كيميائية", count: 32, icon: Droplet, image: chemicalImage },
  { name: "صناعة النسيج", count: 28, icon: Shirt, image: textileImage },
  { name: "صناعة ميكانيكية", count: 38, icon: Cog, image: mechanicalImage },
  { name: "صناعة إلكترونية", count: 22, icon: Cpu, image: electronicsImage },
  { name: "مواد البناء", count: 41, icon: Building, image: constructionImage },
];

export default function CategoriesSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-categories-title">
            القطاعات الصناعية
          </h2>
          <p className="text-muted-foreground text-lg" data-testid="text-categories-subtitle">
            اكتشف المصانع حسب القطاع الذي يهمك
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              count={category.count}
              icon={category.icon}
              image={category.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
