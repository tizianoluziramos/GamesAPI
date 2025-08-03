import { Request, Response } from "express";
import endingsRepository from "../repositories/endings.repository";

class endings {
  public async getAll(req: Request, res: Response) {
    res.json(await endingsRepository.getAll());
  }

  public async getBranches(req: Request, res: Response) {
    res.json(await endingsRepository.getBranches());
  }

  public async getNeutralRoutes(req: Request, res: Response) {
    res.json(await endingsRepository.getNeutralRoutes());
  }

  public async getNeutralEndings(req: Request, res: Response) {
    res.json(await endingsRepository.getNeutralEndings());
  }
}

export default new endings();
