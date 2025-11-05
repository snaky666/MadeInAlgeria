// Replit Auth disabled - using mock authentication
// Uncomment this file when ready to use authentication

import type { Express, RequestHandler } from "express";

export function getSession() {
  return (req: any, res: any, next: any) => next();
}

export async function setupAuth(app: Express) {
  // Mock auth setup - no actual authentication
  console.log("Mock auth enabled - no real authentication");
}

export const isAuthenticated: RequestHandler = (req, res, next) => {
  // Mock authentication - always allow
  (req as any).user = {
    claims: { sub: 'mock-user-id' }
  };
  next();
};

export const isAdmin: RequestHandler = (req, res, next) => {
  // Mock admin check - always allow
  next();
};