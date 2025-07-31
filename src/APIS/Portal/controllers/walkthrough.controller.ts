import { Request, Response } from "express";
import walkthroughRepository from "../repositories/walkthrough.repository";

class walkthrough {
  public async getAll(req: Request, res: Response) {
    res.json(await walkthroughRepository.getAll());
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    res.json(await walkthroughRepository.getByName(name));
  }

  public async getByUrl(req: Request, res: Response) {
    const { url } = req.params;
    res.json(await walkthroughRepository.getByUrl(url));
  }
}

export default new walkthrough();
