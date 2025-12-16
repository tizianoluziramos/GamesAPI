import { Request, Response } from "express";
import instrumentsRepository from "../repositories/instruments.repository";

class instruments {
  public async getAll(req: Request, res: Response) {
    const data = await instrumentsRepository.getAll();
    res.json(data);
  }

  public async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const result = await instrumentsRepository.getById(id);
    if (!result) {
      res.status(404).json({ message: "Instrument not found" });
      return;
    }

    res.json(result);
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const result = await instrumentsRepository.getByName(name);
    if (!result) {
      res.status(404).json({ message: "Instrument not found" });
      return;
    }

    res.json(result);
  }
}

export default new instruments();
