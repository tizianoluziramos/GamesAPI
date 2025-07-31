import { Request, Response } from "express";

class index {
  public getRoutes(req: Request, res: Response) {
    res.json({ routes: ["fnaf1"] });
  }
}

export default new index();
