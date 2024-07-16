// Next 13's hot reload causes for multiple prismaClients to be created, so we need to check if it exists before creating it

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalThis.prisma = client;
export default client;
