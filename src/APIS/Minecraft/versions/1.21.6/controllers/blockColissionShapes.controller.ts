import { Request, Response } from "express";
import blockColissionShapesRepository from "../repositories/blockColissionShapes.repository";

class BlockCollisionShapesController {
  public async getAll(req: Request, res: Response) {
    const data = await blockColissionShapesRepository.getAll();
    res.json(data);
  }

  public async getBlocks(req: Request, res: Response) {
    const blocks = await blockColissionShapesRepository.getBlocks();
    res.json(blocks);
  }

  public async getShapes(req: Request, res: Response) {
    const shapes = await blockColissionShapesRepository.getShapes();
    res.json(shapes);
  }
}

export default new BlockCollisionShapesController();
