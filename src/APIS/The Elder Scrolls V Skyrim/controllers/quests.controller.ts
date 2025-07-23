import { Request, Response } from "express";
import questsRepository from "../repositories/quests.repository";

class quests {
  public async getAll(req: Request, res: Response) {
    res.json(await questsRepository.getAll());
  }
  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    res.json(await questsRepository.getByName(name));
  }
  public async filterByLocation(req: Request, res: Response) {
    const { location } = req.params;
    res.json(await questsRepository.filterByLocation(location));
  }
  public async filterByHold(req: Request, res: Response) {
    const { hold } = req.params;
    res.json(await questsRepository.filterByHold(hold));
  }
}

export default new quests();
