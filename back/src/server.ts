import fastify from "fastify"
import cors from "@fastify/cors";
import { registerRoutes } from "./routes/routes";

const app = fastify()

app.register(cors, {
    origin: [`${process.env.URL_FRONT}`],
  });

registerRoutes(app);

app.listen({
    port: 3333,
}).then(()=> {
    console.log(`Servidor executando em ${process.env.URL_BACK}`)
})