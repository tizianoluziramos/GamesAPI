import { Request, Response } from "express";
import mapIconsRepository from "../repositories/mapIcons.repository";

class MapIconsController {
  public async getAll(req: Request, res: Response) {
    try {
      const data = await mapIconsRepository.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving map icons", details: error });
      return;
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const icon = await mapIconsRepository.getById(Number(id));
      if (!icon) {
        res.status(404).json({ error: "Map icon not found" });
        return;
      }
      res.json(icon);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving map icon by ID", details: error });
      return;
    }
  }

  public async getByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      const icon = await mapIconsRepository.getByName(name);
      if (!icon) {
        res.status(404).json({ error: "Map icon not found" });
        return;
      }
      res.json(icon);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving map icon by name", details: error });
      return;
    }
  }

  public async getByAppearance(req: Request, res: Response) {
    try {
      const { appearance } = req.params;
      const icon = await mapIconsRepository.getByAppearance(appearance);
      if (!icon) {
        res.status(404).json({ error: "Map icon not found" });
        return;
      }
      res.json(icon);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving map icon by appearance", details: error });
      return;
    }
  }

  public async filterByVisibleInItemFrame(req: Request, res: Response) {
    try {
      const { visible } = req.params;
      const isVisible = visible === "true";
      const icons = await mapIconsRepository.filterByVisibleInItemFrame(isVisible);
      res.json(icons);
    } catch (error) {
      res.status(500).json({ error: "Error filtering by visibility", details: error });
      return;
    }
  }
}

export default new MapIconsController();
