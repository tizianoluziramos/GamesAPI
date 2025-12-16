import { Request, Response } from "express";
import tintsRepositories from "../repositories/tints.repository";

class tints {
  public async getAll(req: Request, res: Response) {
    const data = await tintsRepositories.getAll();
    res.json(data);
  }

  public async getConstant(req: Request, res: Response) {
    const data = await tintsRepositories.getConstant();
    res.json(data);
  }

  public async getFoliage(req: Request, res: Response) {
    const data = await tintsRepositories.getFoliage();
    res.json(data);
  }

  public async getGrass(req: Request, res: Response) {
    const data = await tintsRepositories.getGrass();
    res.json(data);
  }

  public async getRedstone(req: Request, res: Response) {
    const data = await tintsRepositories.getRedstone();
    res.json(data);
  }

  public async getWater(req: Request, res: Response) {
    const data = await tintsRepositories.getWater();
    res.json(data);
  }
}

export default new tints();
