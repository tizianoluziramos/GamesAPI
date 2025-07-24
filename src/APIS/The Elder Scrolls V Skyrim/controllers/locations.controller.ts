import { Request, Response } from "express";
import locationsRepository from "../repositories/locations.repository";

class locations {
  public async getAll(req: Request, res: Response) {
    res.json(await locationsRepository.getAll());
  }
  public async getLocations(req: Request, res: Response) {
    res.json(await locationsRepository.getLocations());
  }
  public async getImages(req: Request, res: Response) {
    res.json(await locationsRepository.getImages());
  }
  public async getExternalLinks(req: Request, res: Response) {
    res.json(await locationsRepository.getExternalLinks());
  }
}

export default new locations();
