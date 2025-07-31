import { Request, Response } from "express";
import spellsRepository from "../repositories/spells.repository";
import { School } from "../models/spells.model";

class spells {
  public async getAll(req: Request, res: Response) {
    res.json(await spellsRepository.getAll());
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    res.json(await spellsRepository.getByName(name));
  }

  public async filterBySchool(req: Request, res: Response) {
    const school = req.params.school as School;
    res.json(await spellsRepository.filterBySchool(school));
  }
}

export default new spells();
