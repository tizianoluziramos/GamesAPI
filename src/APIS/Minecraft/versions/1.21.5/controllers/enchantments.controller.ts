import { Request, Response } from "express";
import enchantmentsRepository from "../repositories/enchantments.repository";

class enchantments {
  public async getAll(req: Request, res: Response) {
    const data = await enchantmentsRepository.getAll();
    res.json(data);
  }

  public async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const result = await enchantmentsRepository.getById(id);
    if (!result) {
      res.status(404).json({ message: "Enchantment not found" });
      return;
    }

    res.json(result);
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const result = await enchantmentsRepository.getByName(name);
    if (!result) {
      res.status(404).json({ message: "Enchantment not found" });
      return;
    }

    res.json(result);
  }

  public async getByDisplayName(req: Request, res: Response) {
    const { display_name } = req.params;
    const result = await enchantmentsRepository.getByDisplayName(display_name);
    if (!result) {
      res.status(404).json({ message: "Enchantment not found" });
      return;
    }

    res.json(result);
  }

  public async filterByMaxLevel(req: Request, res: Response) {
    const max_level = parseInt(req.params.max_level);
    if (isNaN(max_level)) {
      res.status(400).json({ message: "Invalid max level" });
      return;
    }

    const result = await enchantmentsRepository.filterByMaxLevel(max_level);
    res.json(result);
  }

  public async filterByTreasureOnly(req: Request, res: Response) {
    const value = req.params.treasureonly === "true";
    const result = await enchantmentsRepository.filterByTreasureOnly(value);
    res.json(result);
  }

  public async filterByCurse(req: Request, res: Response) {
    const value = req.params.curse === "true";
    const result = await enchantmentsRepository.filterByCurse(value);
    res.json(result);
  }

  public async filterByCategory(req: Request, res: Response) {
    const { category } = req.params;
    const result = await enchantmentsRepository.filterByCategory(category);
    res.json(result);
  }

  public async filterByWeight(req: Request, res: Response) {
    const weight = parseInt(req.params.weight);
    if (isNaN(weight)) {
      res.status(400).json({ message: "Invalid weight" });
      return;
    }

    const result = await enchantmentsRepository.filterByWeight(weight);
    res.json(result);
  }

  public async filterByTradeable(req: Request, res: Response) {
    const value = req.params.tradeable === "true";
    const result = await enchantmentsRepository.filterByTradeable(value);
    res.json(result);
  }

  public async filterByDiscoverable(req: Request, res: Response) {
    const value = req.params.discoverable === "true";
    const result = await enchantmentsRepository.filterByDiscoverable(value);
    res.json(result);
  }
}

export default new enchantments();
