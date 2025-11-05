import FactoryCard from '../FactoryCard';
import foodImage from '@assets/generated_images/Food_processing_factory_f7e8372e.png';

export default function FactoryCardExample() {
  return (
    <div className="p-8 bg-background max-w-sm">
      <FactoryCard
        id="1"
        name="مصنع الأغذية الجزائرية"
        category="صناعة غذائية"
        wilaya="الجزائر"
        description="متخصصون في إنتاج المواد الغذائية عالية الجودة منذ 1995"
        image={foodImage}
        phone="0551234567"
        email="info@factory.dz"
      />
    </div>
  );
}
