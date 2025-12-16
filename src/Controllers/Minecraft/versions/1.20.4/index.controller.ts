import { Request, Response } from "express";

class index {
  public getRoutes(req: Request, res: Response) {
    res.json({ routes: ["blocks", "sounds"] });
  }
}

export default new index();
