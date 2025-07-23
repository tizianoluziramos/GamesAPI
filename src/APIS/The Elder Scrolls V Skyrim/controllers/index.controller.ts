import { Request, Response } from "express";

class index {
  public getRoutes(req: Request, res: Response) {
    res.json({ routes: ["characters", "weapons", "quests"] });
  }
}

export default new index();
