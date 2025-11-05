import FactoryCard from "./FactoryCard";
import foodImage from "@assets/generated_images/Food_processing_factory_f7e8372e.png";
import textileImage from "@assets/generated_images/Textile_manufacturing_facility_6b7b136d.png";
import chemicalImage from "@assets/generated_images/Chemical_industrial_plant_f430d10c.png";
import mechanicalImage from "@assets/generated_images/Mechanical_manufacturing_workshop_e0c98248.png";
import electronicsImage from "@assets/generated_images/Electronics_manufacturing_facility_074020bc.png";
import constructionImage from "@assets/generated_images/Construction_materials_factory_ab9c6803.png";

//todo: remove mock functionality
const factories = [
  {
    id: "1",
    name: "مصنع الأغذية الجزائرية",
    category: "صناعة غذائية",
    wilaya: "الجزائر",
    description: "متخصصون في إنتاج المواد الغذائية عالية الجودة منذ 1995",
    image: foodImage,
    phone: "0551234567",
    email: "info@food.dz",
  },
  {
    id: "2",
    name: "مصنع النسيج الحديث",
    category: "صناعة النسيج",
    wilaya: "وهران",
    description: "إنتاج الأقمشة والملابس الجاهزة بأحدث التقنيات",
    image: textileImage,
    phone: "0557654321",
    email: "contact@textile.dz",
  },
  {
    id: "3",
    name: "مصنع الكيماويات المتقدمة",
    category: "صناعة كيميائية",
    wilaya: "سطيف",
    description: "تصنيع المنتجات الكيميائية الصناعية والمنزلية",
    image: chemicalImage,
    phone: "0559876543",
    email: "info@chemical.dz",
  },
  {
    id: "4",
    name: "ورشة الميكانيك الدقيقة",
    category: "صناعة ميكانيكية",
    wilaya: "قسنطينة",
    description: "تصنيع وتجميع القطع الميكانيكية والمعدات الصناعية",
    image: mechanicalImage,
    phone: "0553214567",
    email: "contact@mechanical.dz",
  },
  {
    id: "5",
    name: "مصنع الإلكترونيات الذكية",
    category: "صناعة إلكترونية",
    wilaya: "عنابة",
    description: "تصنيع الأجهزة الإلكترونية والمكونات الذكية",
    image: electronicsImage,
    phone: "0556789012",
    email: "info@electronics.dz",
  },
  {
    id: "6",
    name: "مصنع مواد البناء الحديثة",
    category: "مواد البناء",
    wilaya: "تلمسان",
    description: "إنتاج الإسمنت، الطوب، والمواد الإنشائية المتطورة",
    image: constructionImage,
    phone: "0554567890",
    email: "contact@construction.dz",
  },
];

export default function FeaturedFactories() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {factories.map((factory) => (
            <FactoryCard key={factory.id} {...factory} />
          ))}
        </div>
      </div>
    </section>
  );
}
