import { Request, Response } from "express";

export class index {
  public static index(req: Request, res: Response) {
    res.json({ routes: ["gameinfo", "blocks", "characters", "items", "mechanics", "testchambers", "walkthrough"] });
  }
}
