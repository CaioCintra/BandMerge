import { itemsRoutes } from "./Items";

export const registerRoutes = (app: any) => {
    app.register(itemsRoutes);
  };