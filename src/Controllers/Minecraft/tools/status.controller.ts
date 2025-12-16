import { Request, Response } from "express";

class status {
  public getRoutes(req: Request, res: Response) {
    res.json({ routes: ["server", "player"] });
  }
}

export default new status();
