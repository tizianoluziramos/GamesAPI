import { Request, Response } from "express";
import itemsRepository from "../repositories/items.repository";

class items {
  public async getAll(req: Request, res: Response) {
    res.json(await itemsRepository.getAll());
  }

  public async searchByName(req: Request, res: Response) {
    const name = req.params.name as string;
    if (!name) {
      res.status(500).json({ error: "Param name is not optional." });
    }
    const filteredItems = await itemsRepository.searchByName(name);
    res.json(filteredItems);
  }
}

export default new items();
