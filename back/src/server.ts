import fastify from "fastify"
import cors from "@fastify/cors";
import { registerRoutes } from "./routes/routes";

const app = fastify()

app.register(cors, {
    origin: [`${process.env.URL_FRONT}`],
  });

registerRoutes(app);

const port = process.env.PORT ? parseInt(process.env.PORT) : 3333;

app.listen(port, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor executando em ${process.env.URL_BACK}`);
});
