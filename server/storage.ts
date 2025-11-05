
import { 
  type User, 
  type UpsertUser,
  type Factory,
  type InsertFactory,
  type Message,
  type InsertMessage,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Factory operations
  getAllFactories(): Promise<Factory[]>;
  getFactoryById(id: string): Promise<Factory | undefined>;
  getFeaturedFactories(limit?: number): Promise<Factory[]>;
  getFactoriesByCategory(category: string): Promise<Factory[]>;
  getFactoriesByWilaya(wilaya: string): Promise<Factory[]>;
  searchFactories(query: string, category?: string, wilaya?: string): Promise<Factory[]>;
  createFactory(factory: InsertFactory): Promise<Factory>;
  updateFactory(id: string, factory: Partial<InsertFactory>): Promise<Factory | undefined>;
  deleteFactory(id: string): Promise<boolean>;
  
  // Message operations
  getMessagesByFactory(factoryId: string): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  markMessageAsRead(id: string): Promise<boolean>;
  
  // Statistics
  getStats(): Promise<{
    totalFactories: number;
    totalWilayas: number;
    totalCategories: number;
    factoriesByCategory: { category: string; count: number }[];
    factoriesByWilaya: { wilaya: string; count: number }[];
  }>;
}

// Mock data storage
class MockStorage implements IStorage {
  private users: Map<string, User> = new Map();
  private factories: Map<string, Factory> = new Map();
  private messages: Map<string, Message> = new Map();

  constructor() {
    // Initialize with sample factories
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleFactories: Factory[] = [
      {
        id: '1',
        name: 'مصنع الإلكترونيات الحديثة',
        description: 'متخصصون في تصنيع الأجهزة الإلكترونية والمكونات الدقيقة',
        category: 'إلكترونيات',
        wilaya: 'الجزائر',
        address: 'المنطقة الصناعية، الجزائر العاصمة',
        phone: '023 45 67 89',
        email: 'contact@electronics.dz',
        website: 'www.electronics.dz',
        latitude: '36.7538',
        longitude: '3.0588',
        images: ['/attached_assets/generated_images/Electronics_manufacturing_facility_074020bc.png'],
        products: ['هواتف ذكية', 'أجهزة لوحية', 'مكونات إلكترونية'],
        established: '2015',
        featured: true,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: '2',
        name: 'مصنع النسيج الوطني',
        description: 'إنتاج الأقمشة والملابس الجاهزة بجودة عالية',
        category: 'نسيج',
        wilaya: 'وهران',
        address: 'الحي الصناعي، وهران',
        phone: '041 23 45 67',
        email: 'info@textile.dz',
        website: 'www.textile.dz',
        latitude: '35.6969',
        longitude: '-0.6331',
        images: ['/attached_assets/generated_images/Textile_manufacturing_facility_6b7b136d.png'],
        products: ['أقمشة قطنية', 'ملابس جاهزة', 'منسوجات منزلية'],
        established: '2010',
        featured: true,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
      },
      {
        id: '3',
        name: 'مصنع الأغذية الطازجة',
        description: 'معالجة وتعبئة المنتجات الغذائية الطازجة',
        category: 'أغذية',
        wilaya: 'قسنطينة',
        address: 'المنطقة الصناعية، قسنطينة',
        phone: '031 98 76 54',
        email: 'contact@food.dz',
        website: 'www.food.dz',
        latitude: '36.3650',
        longitude: '6.6147',
        images: ['/attached_assets/generated_images/Food_processing_factory_f7e8372e.png'],
        products: ['منتجات ألبان', 'معلبات', 'عصائر طبيعية'],
        established: '2012',
        featured: true,
        createdAt: new Date('2024-01-03'),
        updatedAt: new Date('2024-01-03'),
      },
      {
        id: '4',
        name: 'مصنع مواد البناء',
        description: 'إنتاج مواد البناء والإسمنت',
        category: 'بناء',
        wilaya: 'عنابة',
        address: 'المنطقة الصناعية، عنابة',
        phone: '038 56 78 90',
        email: 'info@construction.dz',
        website: null,
        latitude: '36.9000',
        longitude: '7.7667',
        images: ['/attached_assets/generated_images/Construction_materials_factory_ab9c6803.png'],
        products: ['إسمنت', 'طوب', 'مواد عازلة'],
        established: '2008',
        featured: false,
        createdAt: new Date('2024-01-04'),
        updatedAt: new Date('2024-01-04'),
      },
      {
        id: '5',
        name: 'مصنع الكيماويات الصناعية',
        description: 'إنتاج المواد الكيميائية للاستخدام الصناعي',
        category: 'كيماويات',
        wilaya: 'سطيف',
        address: 'الحي الصناعي، سطيف',
        phone: '036 12 34 56',
        email: 'contact@chemical.dz',
        website: 'www.chemical.dz',
        latitude: '36.1905',
        longitude: '5.4106',
        images: ['/attached_assets/generated_images/Chemical_industrial_plant_f430d10c.png'],
        products: ['مواد تنظيف', 'مذيبات صناعية', 'أصباغ'],
        established: '2014',
        featured: false,
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-05'),
      },
      {
        id: '6',
        name: 'مصنع الميكانيك الدقيق',
        description: 'تصنيع القطع الميكانيكية والآلات الصناعية',
        category: 'ميكانيك',
        wilaya: 'بليدة',
        address: 'المنطقة الصناعية، البليدة',
        phone: '025 67 89 01',
        email: 'info@mechanics.dz',
        website: null,
        latitude: '36.4811',
        longitude: '2.8277',
        images: ['/attached_assets/generated_images/Mechanical_manufacturing_workshop_e0c98248.png'],
        products: ['قطع غيار', 'معدات صناعية', 'أدوات دقيقة'],
        established: '2011',
        featured: true,
        createdAt: new Date('2024-01-06'),
        updatedAt: new Date('2024-01-06'),
      },
    ];

    sampleFactories.forEach(factory => {
      this.factories.set(factory.id, factory);
    });
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.email === email);
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const user: User = {
      id: userData.id || `user-${Date.now()}`,
      email: userData.email || null,
      firstName: userData.firstName || null,
      lastName: userData.lastName || null,
      profileImageUrl: userData.profileImageUrl || null,
      isAdmin: userData.isAdmin || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.users.set(user.id, user);
    return user;
  }

  // Factory operations
  async getAllFactories(): Promise<Factory[]> {
    return Array.from(this.factories.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async getFactoryById(id: string): Promise<Factory | undefined> {
    return this.factories.get(id);
  }

  async getFeaturedFactories(limit: number = 6): Promise<Factory[]> {
    return Array.from(this.factories.values())
      .filter(f => f.featured)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }

  async getFactoriesByCategory(category: string): Promise<Factory[]> {
    return Array.from(this.factories.values())
      .filter(f => f.category === category)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getFactoriesByWilaya(wilaya: string): Promise<Factory[]> {
    return Array.from(this.factories.values())
      .filter(f => f.wilaya === wilaya)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async searchFactories(query: string, category?: string, wilaya?: string): Promise<Factory[]> {
    let results = Array.from(this.factories.values());

    if (query) {
      const searchLower = query.toLowerCase();
      results = results.filter(f =>
        f.name.toLowerCase().includes(searchLower) ||
        f.description.toLowerCase().includes(searchLower) ||
        f.products?.some(p => p.toLowerCase().includes(searchLower))
      );
    }

    if (category) {
      results = results.filter(f => f.category === category);
    }

    if (wilaya) {
      results = results.filter(f => f.wilaya === wilaya);
    }

    return results.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createFactory(factoryData: InsertFactory): Promise<Factory> {
    const factory: Factory = {
      id: `factory-${Date.now()}`,
      ...factoryData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.factories.set(factory.id, factory);
    return factory;
  }

  async updateFactory(id: string, factoryData: Partial<InsertFactory>): Promise<Factory | undefined> {
    const factory = this.factories.get(id);
    if (!factory) return undefined;

    const updated: Factory = {
      ...factory,
      ...factoryData,
      updatedAt: new Date(),
    };
    this.factories.set(id, updated);
    return updated;
  }

  async deleteFactory(id: string): Promise<boolean> {
    return this.factories.delete(id);
  }

  // Message operations
  async getMessagesByFactory(factoryId: string): Promise<Message[]> {
    return Array.from(this.messages.values())
      .filter(m => m.factoryId === factoryId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createMessage(messageData: InsertMessage): Promise<Message> {
    const message: Message = {
      id: `message-${Date.now()}`,
      ...messageData,
      read: false,
      createdAt: new Date(),
    };
    this.messages.set(message.id, message);
    return message;
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const message = this.messages.get(id);
    if (!message) return false;

    this.messages.set(id, { ...message, read: true });
    return true;
  }

  // Statistics
  async getStats() {
    const allFactories = await this.getAllFactories();
    
    const categoryCounts = allFactories.reduce((acc, factory) => {
      acc[factory.category] = (acc[factory.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const wilayaCounts = allFactories.reduce((acc, factory) => {
      acc[factory.wilaya] = (acc[factory.wilaya] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalFactories: allFactories.length,
      totalWilayas: Object.keys(wilayaCounts).length,
      totalCategories: Object.keys(categoryCounts).length,
      factoriesByCategory: Object.entries(categoryCounts).map(([category, count]) => ({
        category,
        count,
      })),
      factoriesByWilaya: Object.entries(wilayaCounts).map(([wilaya, count]) => ({
        wilaya,
        count,
      })),
    };
  }
}

export const storage = new MockStorage();
