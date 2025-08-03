import { Request, Response } from "express";
import locationsRepository from "../repositories/locations.repository";

class locations {
  public async getAll(req: Request, res: Response) {
    const data = await locationsRepository.getAll();
    res.json(data);
  }

  public async getCategory(req: Request, res: Response) {
    const { category } = req.params;
    const data = await locationsRepository.getCategory(category as any);
    if (!data) return res.status(404).json({ message: "Category not found" });
    res.json(data);
  }

  public async getAmalgamates(req: Request, res: Response) {
    const data = await locationsRepository.getAmalgamates();
    res.json(data);
  }

  public async searchByName(req: Request, res: Response) {
    const { name } = req.params;
    const results = await locationsRepository.findByName(name);
    res.json(results);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await locationsRepository.findById(Number(id));
    if (!result) return res.status(404).json({ message: "Location not found" });
    res.json(result);
  }
}

export default new locations();
