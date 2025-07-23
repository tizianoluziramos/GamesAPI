import { Request, Response } from "express";

class index {
  public getRoutes(req: Request, res: Response) {
    res.json({ routes: ["attributes", "biomes", "blockColissionShapes", "blocks", "effects", "enchantments", "entities", "foods", "instruments", "items", "materials", "particles", "recipes", "sounds", "tints", "language"] });
  }
}

export default new index();
