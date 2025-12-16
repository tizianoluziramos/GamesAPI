import { Request, Response } from "express";

class index {
  public getAll(req: Request, res: Response) {
    res.json({ routes: ["characters", "locations", "items", "endings"] });
  }
}

export default new index();
