import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { z } from "zod";

const prisma = new PrismaClient();

export async function mergeRoutes(app: FastifyInstance) {
  app.get("/merge/:first/:second", async (request) => {
    try {
      const paramsSchema = z.object({
        first: z.string(),
        second: z.string(),
      });

      const { first } = paramsSchema.parse(request.params);
      const { second } = paramsSchema.parse(request.params);

      let merge = await prisma.merge.findMany({
        where: {
          FirstId: first,
          SecondId: second,
        },
      });

      if (merge.length === 0) {
        merge = await prisma.merge.findMany({
          where: {
            FirstId: second,
            SecondId: first,
          },
        });
      }

      if (merge.length === 0) return { error: "No Merges" };
      else return merge;
    } catch (error) {
      console.error("Erro ao processar a solicitação:", error);
      return { error: "Ocorreu um erro ao processar a solicitação." };
    }
  });
}
