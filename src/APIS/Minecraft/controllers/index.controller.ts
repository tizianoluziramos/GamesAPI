import { Request, Response } from "express";

class index {
  public getRoutes(req: Request, res: Response) {
    res.json({ routes: ["versions", "tools"] });
  }
}

export default new index();
