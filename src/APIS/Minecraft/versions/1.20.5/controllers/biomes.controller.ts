import { Request, Response } from "express";
import biomesRepository from "../repositories/biomes.repository";

class biomes {
  public async getAll(req: Request, res: Response) {
    const data = await biomesRepository.getAll();
    res.json(data);
  }

  public async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const biome = await biomesRepository.getById(id);
    if (!biome) {
      res.status(404).json({ message: "Biome not found" });
      return;
    }

    res.json(biome);
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const biome = await biomesRepository.getByName(name);
    if (!biome) {
      res.status(404).json({ message: "Biome not found" });
      return;
    }
    res.json(biome);
  }

  public async getByDisplayName(req: Request, res: Response) {
    const { displayName } = req.params;
    const biome = await biomesRepository.getByDisplayName(displayName);
    if (!biome) {
      res.status(404).json({ message: "Biome not found" });
      return;
    }
    res.json(biome);
  }

  public async filterByCategory(req: Request, res: Response) {
    const { category } = req.params;
    const results = await biomesRepository.filterByCategory(category);
    res.json(results);
  }

  public async filterByTemperature(req: Request, res: Response) {
    const temperature = parseFloat(req.params.temperature);
    if (isNaN(temperature)) {
      res.status(400).json({ message: "Invalid temperature value" });
      return;
    }
    const results = await biomesRepository.filterByTemperature(temperature);
    res.json(results);
  }

  public async filterByPrecipitation(req: Request, res: Response) {
    const precipitation = req.params.precipitation === "true";
    const results = await biomesRepository.filterByPrecipitation(precipitation);
    res.json(results);
  }

  public async filterByDimension(req: Request, res: Response) {
    const { dimension } = req.params;
    const results = await biomesRepository.filterByDimension(dimension);
    res.json(results);
  }

  public async filterByColor(req: Request, res: Response) {
    const color = parseInt(req.params.color);
    if (isNaN(color)) {
      res.status(400).json({ message: "Invalid color value" });
      return;
    }
    const results = await biomesRepository.filterByColor(color);
    res.json(results);
  }
}

export default new biomes();
