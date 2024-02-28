import { itemsRoutes } from "./Items";
import { mergeRoutes } from "./merge";
import { usersRoutes } from "./users";

export const registerRoutes = (app: any) => {
    app.register(itemsRoutes);
    app.register(mergeRoutes);
    app.register(usersRoutes);
  };