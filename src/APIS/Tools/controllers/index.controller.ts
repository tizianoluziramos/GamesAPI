import { Request, Response } from "express";

class indexController {
  public getRoutes(req: Request, res: Response): void {
    res.status(200).json({ routes: ["gamerecommender"] });
  }
}

export default new indexController();
