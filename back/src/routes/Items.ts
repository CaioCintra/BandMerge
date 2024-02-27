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
    app.get("/items/genres", async () => {
    const items = await prisma.item.findMany({
      where:{
        type: "genre"
      },
      orderBy: {
        name: "asc",
      },
    });
    return items;
  });
  app.get("/items/bands", async () => {
    const items = await prisma.item.findMany({
      where:{
        type: "band"
      },
      orderBy: {
        name: "asc",
      },
    });
    return items;
  });
}
