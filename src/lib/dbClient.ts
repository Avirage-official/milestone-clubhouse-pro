// src/lib/dbClient.ts
import { PrismaClient } from '@prisma/client';

export const DB_ENABLED =
  process.env.NEXT_PUBLIC_DB_ENABLED === 'true' &&
  !!process.env.DATABASE_URL;

// Only create the Prisma client if DB is enabled.
// This keeps the demo front‑end only.
export const prisma = DB_ENABLED ? new PrismaClient() : null;
