import { Request, Response } from "express";
import charactersRepository from "../repositories/characters.repository";

class characters {
  public async getAll(req: Request, res: Response) {
    res.json(await charactersRepository.getAll());
  }
  public async getByPageID(req: Request, res: Response) {
    const { pageid } = req.params;
    res.json(await charactersRepository.getByPageId(parseInt(pageid)));
  }
}

export default new characters();
