import { Request, Response } from "express";
import charactersRepository from "../repositories/characters.repository";

class characters {
  public async getAll(req: Request, res: Response) {
    res.json(await charactersRepository.getAll());
  }

  public async getByID(req: Request, res: Response) {
    let { id } = req.params;
    if (!id) {
      res.status(200).json({ error: "Please insert parameter ID" });
    }
    res.json(await charactersRepository.getByID(parseInt(id)));
  }

  public async searchByName(req: Request, res: Response) {
    const { name } = req.params;
    if (!name) res.status(200).json({ error: "Please insert name" });
    res.json(await charactersRepository.searchByName(name));
  }
}

export default new characters();
