import { Request, Response } from "express";
import itemsRepository from "../repositories/items.repository";

class items {
  public async getAll(req: Request, res: Response) {
    const data = await itemsRepository.getAll();
    res.json(data);
  }

  public async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const result = await itemsRepository.getById(id);
    if (!result) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    res.json(result);
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const result = await itemsRepository.getByName(name);
    if (!result) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    res.json(result);
  }

  public async getByDisplayName(req: Request, res: Response) {
    const { displayname } = req.params;
    const result = await itemsRepository.getByDisplayName(displayname);
    if (!result) {
      res.status(404).json({ message: "Item not found" });
      return;
    }

    res.json(result);
  }

  public async filterByStackSize(req: Request, res: Response) {
    const stackSize = parseInt(req.params.stackSize) as 1 | 16 | 64;
    if (![1, 16, 64].includes(stackSize)) {
      res.status(400).json({ message: "Invalid stack size" });
      return;
    }

    const results = await itemsRepository.filterByStackSize(stackSize);
    res.json(results);
  }
}

export default new items();
