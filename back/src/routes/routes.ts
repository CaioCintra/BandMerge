import { itemsRoutes } from "./Items";
import { mergeRoutes } from "./merge";

export const registerRoutes = (app: any) => {
    app.register(itemsRoutes);
    app.register(mergeRoutes);
  };