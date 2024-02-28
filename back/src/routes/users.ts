import { PrismaClient } from "@prisma/client";
import { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";

const bcrypt = require("bcrypt");
const prisma = new PrismaClient();
const userSchema = z.object({
  name: z.string(),
  password: z.string(),
});

export async function usersRoutes(app: FastifyInstance) {
  app.get("/users", async () => {
    const users = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return users;
  });

  app.post("/users", async (request, reply) => {
    try {
      const { name, password } = userSchema.parse(request.body);

      const hashedPassword = await bcrypt.hash(password, 10);

      const itemIdsToConnect = [
        "b8711f03-cd67-4556-8c4e-9cd57aeea00a",
        "f60c85ec-8daa-4301-b6c3-750a0965a020",
        "269365e5-7987-4d71-bce8-df139e7719da",
        "1717f655-dcff-466f-9e1e-e8717118922e",
        "251f26f5-0a8b-4286-a423-a8776d6ce7ee",
      ];

      const itemUniqueInputs = itemIdsToConnect.map((itemId) => ({
        id: itemId,
      }));

      const newUser = await prisma.user.create({
        data: {
          name,
          password: hashedPassword,
          collection: {
            connect: itemUniqueInputs,
          },
        },
        include: {
          collection: true,
        },
      });

      reply.code(201).send(newUser);
    } catch (error) {
      reply.code(400).send({ error: error.message });
    }
  });

  app.post("/login", async (request, reply) => {
    try {
      const { name, password } = userSchema.parse(request.body);

      const user = await prisma.user.findFirst({
        where: {
          name,
        },
      });

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Senha incorreta.");
      }

      reply.code(200).send({ message: "Login bem-sucedido.", userId: user.id });
      return user.id;
    } catch (error) {
      reply.code(401).send({ error: error.message });
    }
  });

  app.post("/users/:userId/collection/:itemId", async (request: FastifyRequest<{ Params: { userId: string, itemId: string } }>, reply) => {
    try {
      const { userId, itemId } = request.params;
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          collection: true,
        },
      });

      if (!user) {
        throw new Error("Usuário não encontrado.");
      }

      const item = await prisma.item.findUnique({
        where: {
          id: itemId,
        },
      });

      if (!item) {
        throw new Error("Item não encontrado.");
      }

      const existingItem = user.collection.find(
        (collectionItem) => collectionItem.id === itemId
      );
      if (existingItem) {
        throw new Error("O item já está na coleção do usuário.");
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          collection: {
            connect: {
              id: itemId,
            },
          },
        },
        include: {
          collection: true,
        },
      });

      reply.code(201).send(updatedUser);
    } catch (error) {
      reply.code(400).send({ error: error.message });
    }
  });
}
