import { Request, Response } from "express";
import attributesRepository from "../repositories/attributes.repository";

class attributes {
  public async getAll(req: Request, res: Response) {
    const data = await attributesRepository.getAll();
    res.json(data);
  }
  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const attribute = await attributesRepository.getByName(name);
    if (!attribute) {
      res.status(404).json({ message: "Attribute not found" });
      return;
    }
    res.json(attribute);
  }
  public async getByResource(req: Request, res: Response) {
    const { resource } = req.params;
    const attribute = await attributesRepository.getByResource(resource);
    if (!attribute) {
      res.status(404).json({ message: "Attribute not found" });
      return;
    }
    res.json(attribute);
  }
  public async filterByMax(req: Request, res: Response) {
    const max = parseFloat(req.params.max);
    if (isNaN(max)) {
      res.status(400).json({ message: "Invalid max value" });
      return;
    }
    const results = await attributesRepository.filterByMax(max);
    res.json(results);
  }
  public async filterByDefault(req: Request, res: Response) {
    const def = parseFloat(req.params.default);
    if (isNaN(def)) {
      res.status(400).json({ message: "Invalid default value" });
      return;
    }
    const results = await attributesRepository.filterByDefault(def);
    res.json(results);
  }
}

export default new attributes();
