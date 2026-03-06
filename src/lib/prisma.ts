import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export function getPrisma(): PrismaClient {
  const client = global.prisma ?? new PrismaClient();
  if (process.env.NODE_ENV !== "production") global.prisma = client;
  return client;
}
