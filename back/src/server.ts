import fastify from "fastify"
import cors from "@fastify/cors";
import { registerRoutes } from "./routes/routes";

const app = fastify()

app.register(cors, {
    origin: ["https://bandmerge.vercel.app", "http://localhost:3000"],
  });


const port = process.env.PORT || 3333;
registerRoutes(app);

app.listen({
    port: 3333,
}).then(()=> {
    console.log('Servidor executando em http://localhost:3333')
})