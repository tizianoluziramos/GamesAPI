import { Request, Response } from "express";
import foodsRepository from "../repositories/foods.repository";

class foods {
  public async getAll(req: Request, res: Response) {
    const data = await foodsRepository.getAll();
    res.json(data);
  }

  public async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const result = await foodsRepository.getById(id);
    if (!result) {
      res.status(404).json({ message: "Food not found" });
      return;
    }

    res.json(result);
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const result = await foodsRepository.getByName(name);
    if (!result) {
      res.status(404).json({ message: "Food not found" });
      return;
    }

    res.json(result);
  }

  public async getByDisplayName(req: Request, res: Response) {
    const { displayname } = req.params;
    const result = await foodsRepository.getByDisplayName(displayname);
    if (!result) {
      res.status(404).json({ message: "Food not found" });
      return;
    }

    res.json(result);
  }

  public async filterByStackSize(req: Request, res: Response) {
    const stacksize = parseInt(req.params.stacksize) as 1 | 16 | 64;
    if (![1, 16, 64].includes(stacksize)) {
      res.status(400).json({ message: "Invalid stack size" });
      return;
    }

    const result = await foodsRepository.filterByStackSize(stacksize);
    res.json(result);
  }
}

export default new foods();
