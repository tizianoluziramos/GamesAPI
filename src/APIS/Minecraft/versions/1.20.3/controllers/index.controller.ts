import { Request, Response } from "express";

class index {
  public getRoutes(req: Request, res: Response) {
    res.json({ routes: ["blockColissionShapes", "blocks", "entities", "foods", "items", "materials", "particles", "recipes", "language", "protocol", "loginPacket", "commands"] });
  }
}

export default new index();
