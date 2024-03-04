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
      where: {
        type: "genre",
      },
      orderBy: {
        name: "asc",
      },
    });
    return items;
  });
  app.get("/items/bands", async () => {
    const items = await prisma.item.findMany({
      where: {
        type: "band",
      },
      orderBy: {
        name: "asc",
      },
    });
    return items;
  });

  app.get("/user/:userId/:filter/items", async (request, reply) => {
    try {
      const paramsSchema = z.object({
        userId: z.string(),
        filter: z.string(),
      });
      const { userId, filter } = paramsSchema.parse(request.params);

      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
          items: { where: { type: filter }, orderBy: { name: "asc" } },
        },
      });

      if (!user) {
        reply.code(404).send({ message: "Usuário não encontrado" });
        return;
      }

      return user.items;
    } catch (error) {
      console.error("Erro ao obter itens do usuário:", error);
      reply.code(500).send({ message: "Erro ao processar a solicitação" });
    }
  });
}
