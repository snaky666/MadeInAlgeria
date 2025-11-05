import { 
  type User, 
  type UpsertUser,
  type Factory,
  type InsertFactory,
  type Message,
  type InsertMessage,
  users,
  factories,
  messages
} from "@shared/schema";
import { db } from "./db";
import { eq, and, or, ilike, desc, sql } from "drizzle-orm";

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

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const result = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return result[0];
  }

  // Factory operations
  async getAllFactories(): Promise<Factory[]> {
    return await db.select().from(factories).orderBy(desc(factories.createdAt));
  }

  async getFactoryById(id: string): Promise<Factory | undefined> {
    const result = await db.select().from(factories).where(eq(factories.id, id)).limit(1);
    return result[0];
  }

  async getFeaturedFactories(limit: number = 6): Promise<Factory[]> {
    return await db.select().from(factories)
      .where(eq(factories.featured, true))
      .orderBy(desc(factories.createdAt))
      .limit(limit);
  }

  async getFactoriesByCategory(category: string): Promise<Factory[]> {
    return await db.select().from(factories)
      .where(eq(factories.category, category))
      .orderBy(desc(factories.createdAt));
  }

  async getFactoriesByWilaya(wilaya: string): Promise<Factory[]> {
    return await db.select().from(factories)
      .where(eq(factories.wilaya, wilaya))
      .orderBy(desc(factories.createdAt));
  }

  async searchFactories(query: string, category?: string, wilaya?: string): Promise<Factory[]> {
    const conditions = [];
    
    if (query) {
      conditions.push(
        or(
          ilike(factories.name, `%${query}%`),
          ilike(factories.description, `%${query}%`)
        )
      );
    }
    
    if (category) {
      conditions.push(eq(factories.category, category));
    }
    
    if (wilaya) {
      conditions.push(eq(factories.wilaya, wilaya));
    }

    if (conditions.length === 0) {
      return this.getAllFactories();
    }

    return await db.select().from(factories)
      .where(and(...conditions))
      .orderBy(desc(factories.createdAt));
  }

  async createFactory(factory: InsertFactory): Promise<Factory> {
    const result = await db.insert(factories).values(factory).returning();
    return result[0];
  }

  async updateFactory(id: string, factory: Partial<InsertFactory>): Promise<Factory | undefined> {
    const result = await db.update(factories)
      .set({ ...factory, updatedAt: new Date() })
      .where(eq(factories.id, id))
      .returning();
    return result[0];
  }

  async deleteFactory(id: string): Promise<boolean> {
    const result = await db.delete(factories).where(eq(factories.id, id)).returning();
    return result.length > 0;
  }

  // Message operations
  async getMessagesByFactory(factoryId: string): Promise<Message[]> {
    return await db.select().from(messages)
      .where(eq(messages.factoryId, factoryId))
      .orderBy(desc(messages.createdAt));
  }

  async createMessage(message: InsertMessage): Promise<Message> {
    const result = await db.insert(messages).values(message).returning();
    return result[0];
  }

  async markMessageAsRead(id: string): Promise<boolean> {
    const result = await db.update(messages)
      .set({ read: true })
      .where(eq(messages.id, id))
      .returning();
    return result.length > 0;
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

export const storage = new DatabaseStorage();
