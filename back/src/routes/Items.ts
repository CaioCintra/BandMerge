import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function itemsRoutes(app: FastifyInstance) {
  app.get("/items", async () => {
    const items = await prisma.item.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return items;
  });
}
