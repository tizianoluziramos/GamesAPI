import { Request, Response } from "express";
import charactersRepository from "../repositories/characters.repository";

class characters {
  public async getAll(req: Request, res: Response) {
    res.json(await charactersRepository.getAll());
  }
  public async getByType(req: Request, res: Response) {
    const type = req.params.type;
    if (type !== "enemies" && type !== "maincharacters" && type !== "npcs") {
      res.json({ error: "Param type must be enemies, maincharacters or npcs" });
      return;
    }
    res.json(await charactersRepository.getByType(type));
  }
}

export default new characters();
