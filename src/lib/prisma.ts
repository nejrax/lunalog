import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

declare global {
  var prisma: PrismaClient | undefined;
}

export function getPrisma(): PrismaClient {
  const client = global.prisma ??
    new PrismaClient({
      adapter: new PrismaPg(
        new Pool({
          connectionString: process.env.DATABASE_URL,
        }),
      ),
    });
  if (process.env.NODE_ENV !== "production") global.prisma = client;
  return client;
}
