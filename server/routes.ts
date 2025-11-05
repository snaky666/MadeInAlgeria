import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin } from "./replitAuth";
import { insertFactorySchema, insertMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Replit Auth
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Public routes - Factory listing and viewing
  app.get('/api/factories', async (req, res) => {
    try {
      const { search, category, wilaya, featured } = req.query;
      
      let factories;
      if (featured === 'true') {
        factories = await storage.getFeaturedFactories();
      } else if (search || category || wilaya) {
        factories = await storage.searchFactories(
          search as string || '',
          category as string,
          wilaya as string
        );
      } else {
        factories = await storage.getAllFactories();
      }
      
      res.json(factories);
    } catch (error) {
      console.error("Error fetching factories:", error);
      res.status(500).json({ message: "Failed to fetch factories" });
    }
  });

  app.get('/api/factories/:id', async (req, res) => {
    try {
      const factory = await storage.getFactoryById(req.params.id);
      if (!factory) {
        return res.status(404).json({ message: "Factory not found" });
      }
      res.json(factory);
    } catch (error) {
      console.error("Error fetching factory:", error);
      res.status(500).json({ message: "Failed to fetch factory" });
    }
  });

  app.get('/api/factories/category/:category', async (req, res) => {
    try {
      const factories = await storage.getFactoriesByCategory(req.params.category);
      res.json(factories);
    } catch (error) {
      console.error("Error fetching factories by category:", error);
      res.status(500).json({ message: "Failed to fetch factories" });
    }
  });

  app.get('/api/factories/wilaya/:wilaya', async (req, res) => {
    try {
      const factories = await storage.getFactoriesByWilaya(req.params.wilaya);
      res.json(factories);
    } catch (error) {
      console.error("Error fetching factories by wilaya:", error);
      res.status(500).json({ message: "Failed to fetch factories" });
    }
  });

  // Stats endpoint (public)
  app.get('/api/stats', async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  // Contact/Message routes
  app.post('/api/messages', async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(validatedData);
      res.status(201).json(message);
    } catch (error) {
      console.error("Error creating message:", error);
      res.status(400).json({ message: "Invalid message data" });
    }
  });

  // Admin routes - Factory management
  app.post('/api/admin/factories', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertFactorySchema.parse(req.body);
      const factory = await storage.createFactory(validatedData);
      res.status(201).json(factory);
    } catch (error) {
      console.error("Error creating factory:", error);
      res.status(400).json({ message: "Invalid factory data" });
    }
  });

  app.patch('/api/admin/factories/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const factory = await storage.updateFactory(req.params.id, req.body);
      if (!factory) {
        return res.status(404).json({ message: "Factory not found" });
      }
      res.json(factory);
    } catch (error) {
      console.error("Error updating factory:", error);
      res.status(400).json({ message: "Failed to update factory" });
    }
  });

  app.delete('/api/admin/factories/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const deleted = await storage.deleteFactory(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Factory not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting factory:", error);
      res.status(500).json({ message: "Failed to delete factory" });
    }
  });

  // Admin routes - Message management
  app.get('/api/admin/messages/:factoryId', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const messages = await storage.getMessagesByFactory(req.params.factoryId);
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.patch('/api/admin/messages/:id/read', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const success = await storage.markMessageAsRead(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Error marking message as read:", error);
      res.status(500).json({ message: "Failed to update message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
