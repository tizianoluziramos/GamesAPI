import { Request, Response } from "express";

class index {
  public getRoutes(req: Request, res: Response) {
    res.json({ routes: ["biomes", "blockColissionShapes", "blocks", "effects", "enchantments", "entities", "foods", "instruments", "items", "materials", "particles", "recipes", "sounds", "tints", "language", "protocol", "loginPacket", "mapIcons"] });
  }
}

export default new index();
