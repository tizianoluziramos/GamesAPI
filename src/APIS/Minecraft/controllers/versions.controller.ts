import { Request, Response } from "express";

class index {
  public getVersions(req: Request, res: Response) {
    res.json({ routes: ["1.21.6", "1.21.5", "1.21.4", "1.21.3", "1.21.1", "1.20.5", "1.20.4", "1.20.3", "1.20.2"] });
  }
}

export default new index();
