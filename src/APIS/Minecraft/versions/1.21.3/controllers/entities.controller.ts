import { Request, Response } from "express";
import entitiesRepository from "../repositories/entities.repository";

class entities {
  public async getAll(req: Request, res: Response) {
    const data = await entitiesRepository.getAll();
    res.json(data);
  }

  public async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }
    const entity = await entitiesRepository.getById(id);
    if (!entity) {
      res.status(404).json({ message: "Entity not found" });
      return;
    }
    res.json(entity);
  }

  public async getByInternalId(req: Request, res: Response) {
    const internalId = parseInt(req.params.internalId);
    if (isNaN(internalId)) {
      res.status(400).json({ message: "Invalid internalId" });
      return;
    }
    const entity = await entitiesRepository.getByInternalId(internalId);
    if (!entity) {
      res.status(404).json({ message: "Entity not found" });
      return;
    }
    res.json(entity);
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const entity = await entitiesRepository.getByName(name);
    if (!entity) {
      res.status(404).json({ message: "Entity not found" });
      return;
    }
    res.json(entity);
  }

  public async getByDisplayName(req: Request, res: Response) {
    const { displayName } = req.params;
    const entity = await entitiesRepository.getByDisplayName(displayName);
    if (!entity) {
      res.status(404).json({ message: "Entity not found" });
      return;
    }
    res.json(entity);
  }

  public async filterByType(req: Request, res: Response) {
    const type = req.params.type;

    const allowedTypes = ["ambient", "animal", "hostile", "living", "mob", "other", "passive", "player", "projectile", "water_creature"] as const;

    if (!allowedTypes.includes(type as (typeof allowedTypes)[number])) {
      res.status(400).json({ message: "Invalid type" });
      return;
    }

    const results = await entitiesRepository.filterByType(type as (typeof allowedTypes)[number]);
    res.json(results);
  }

  public async filterByCategory(req: Request, res: Response) {
    const category = req.params.category;

    // Definimos los valores permitidos
    const allowedCategories = ["Hostile mobs", "Immobile", "Passive mobs", "Projectiles", "UNKNOWN", "Vehicles"] as const;

    // Validamos que category está en allowedCategories
    if (!allowedCategories.includes(category as (typeof allowedCategories)[number])) {
      res.status(400).json({ message: "Invalid category" });
      return;
    }

    // Hacemos cast para que TypeScript acepte que es uno de los valores del union type
    const results = await entitiesRepository.filterByCategory(category as (typeof allowedCategories)[number]);
    res.json(results);
  }
}

export default new entities();
