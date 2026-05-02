// Re-export the Prisma client instance
export { prisma, default } from './client';

// Re-export all Prisma types from the generated client
// The client.ts already imports from the correct path
export type { PrismaClient, Prisma } from '../prisma/generated/prisma/client';
export * from '../prisma/generated/prisma/enums';
export * from '../prisma/generated/prisma/models';

// Made with Bob
