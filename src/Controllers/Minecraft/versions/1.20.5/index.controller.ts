import { Request, Response } from "express";

class index {
  public getRoutes(req: Request, res: Response) {
    res.json({ routes: ["biomes", "blockColissionShapes", "blocks", "effects", "enchantments", "entities", "foods", "instruments", "items", "materials", "particles", "recipes", "tints", "language", "protocol", "loginPacket"] });
  }
}

export default new index();
