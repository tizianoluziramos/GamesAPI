import { Request, Response } from "express";
import effectsRepository from "../repositories/effects.repository";

class effects {
  public async getAll(req: Request, res: Response) {
    const data = await effectsRepository.getAll();
    res.json(data);
  }

  public async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const effect = await effectsRepository.getById(id);
    if (!effect) {
      res.status(404).json({ message: "Effect not found" });
      return;
    }

    res.json(effect);
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const effect = await effectsRepository.getByName(name);
    if (!effect) {
      res.status(404).json({ message: "Effect not found" });
      return;
    }

    res.json(effect);
  }

  public async getByDisplayName(req: Request, res: Response) {
    const { displayname } = req.params;
    const effect = await effectsRepository.getByDisplayName(displayname);
    if (!effect) {
      res.status(404).json({ message: "Effect not found" });
      return;
    }

    res.json(effect);
  }

  public async filterByType(req: Request, res: Response) {
    const { type } = req.params;
    if (type !== "good" && type !== "bad") {
      res.status(400).json({ message: "Invalid type, expected 'good' or 'bad'" });
      return;
    }

    const results = await effectsRepository.filterByType(type as "good" | "bad");
    res.json(results);
  }
}

export default new effects();
