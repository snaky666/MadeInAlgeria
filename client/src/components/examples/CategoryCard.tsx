import CategoryCard from '../CategoryCard';
import { Package } from 'lucide-react';
import foodImage from '@assets/generated_images/Food_processing_factory_f7e8372e.png';

export default function CategoryCardExample() {
  return (
    <div className="p-8 bg-background">
      <CategoryCard 
        name="صناعة غذائية"
        count={45}
        icon={Package}
        image={foodImage}
      />
    </div>
  );
}
