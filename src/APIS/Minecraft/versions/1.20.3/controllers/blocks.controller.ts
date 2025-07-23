import { Request, Response } from "express";
import blocksRepository from "../repositories/blocks.repository";

class blocks {
  public async getAll(req: Request, res: Response) {
    const data = await blocksRepository.getAll();
    res.json(data);
  }

  public async getById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid ID" });
      return;
    }

    const block = await blocksRepository.getById(id);
    if (!block) {
      res.status(404).json({ message: "Block not found" });
      return;
    }

    res.json(block);
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const block = await blocksRepository.getByName(name);
    if (!block) {
      res.status(404).json({ message: "Block not found" });
      return;
    }

    res.json(block);
  }

  public async getByDisplayName(req: Request, res: Response) {
    const { displayName } = req.params;
    const block = await blocksRepository.getByDisplayName(displayName);
    if (!block) {
      res.status(404).json({ message: "Block not found" });
      return;
    }

    res.json(block);
  }

  public async filterByHardness(req: Request, res: Response) {
    const value = parseFloat(req.params.hardness);
    if (isNaN(value)) {
      res.status(400).json({ message: "Invalid hardness" });
      return;
    }
    const results = await blocksRepository.filterByHardness(value);
    res.json(results);
  }

  public async filterByResistance(req: Request, res: Response) {
    const value = parseFloat(req.params.resistance);
    if (isNaN(value)) {
      res.status(400).json({ message: "Invalid resistance" });
      return;
    }
    const results = await blocksRepository.filterByResistance(value);
    res.json(results);
  }

  public async filterByStackSize(req: Request, res: Response) {
    const value = parseInt(req.params.stacksize) as 1 | 16 | 64;
    if (![1, 16, 64].includes(value)) {
      res.status(400).json({ message: "Invalid stack size" });
      return;
    }
    const results = await blocksRepository.filterByStackSize(value);
    res.json(results);
  }

  public async filterByDiggable(req: Request, res: Response) {
    const value = req.params.diggable === "true";
    const results = await blocksRepository.filterByDiggable(value);
    res.json(results);
  }

  public async filterByMaterial(req: Request, res: Response) {
    const { material } = req.params;
    const results = await blocksRepository.filterByMaterial(material);
    res.json(results);
  }

  public async filterByTransparent(req: Request, res: Response) {
    const value = req.params.transparent === "true";
    const results = await blocksRepository.filterByTransparent(value);
    res.json(results);
  }

  public async filterByEmitLight(req: Request, res: Response) {
    const value = parseInt(req.params.emitlight);
    if (isNaN(value)) {
      res.status(400).json({ message: "Invalid emitLight" });
      return;
    }
    const results = await blocksRepository.filterByEmitLight(value);
    res.json(results);
  }

  public async filterByFilterLight(req: Request, res: Response) {
    const value = parseInt(req.params.filterlight);
    if (isNaN(value)) {
      res.status(400).json({ message: "Invalid filterLight" });
      return;
    }
    const results = await blocksRepository.filterByFilterLight(value);
    res.json(results);
  }

  public async filterByDefaultState(req: Request, res: Response) {
    const value = parseInt(req.params.defaultstate);
    if (isNaN(value)) {
      res.status(400).json({ message: "Invalid defaultState" });
      return;
    }
    const results = await blocksRepository.filterByDefaultState(value);
    res.json(results);
  }

  public async filterByMinStateId(req: Request, res: Response) {
    const value = parseInt(req.params.minstateid);
    if (isNaN(value)) {
      res.status(400).json({ message: "Invalid minStateId" });
      return;
    }
    const results = await blocksRepository.filterByMinStateId(value);
    res.json(results);
  }

  public async filterByMaxStateId(req: Request, res: Response) {
    const value = parseInt(req.params.maxstateid);
    if (isNaN(value)) {
      res.status(400).json({ message: "Invalid maxStateId" });
      return;
    }
    const results = await blocksRepository.filterByMaxStateId(value);
    res.json(results);
  }

  public async filterByBoundingBox(req: Request, res: Response) {
    const value = req.params.boundingbox;
    if (value !== "block" && value !== "empty") {
      res.status(400).json({ message: "Invalid boundingBox (expected 'block' or 'empty')" });
      return;
    }
    const results = await blocksRepository.filterByBoundingBox(value as "block" | "empty");
    res.json(results);
  }
}

export default new blocks();
