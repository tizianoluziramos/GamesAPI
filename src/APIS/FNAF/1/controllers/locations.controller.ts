import { Request, Response } from "express";
import locationsRepository from "../repositories/locations.repository";

class locations {
  public async getAll(req: Request, res: Response) {
    res.json(await locationsRepository.getAll());
  }
  public async getByID(req: Request, res: Response) {
    const { id } = req.params;
    if (!id) res.status(200).json({ error: "You must insert the ID parameter." });
    res.json(await locationsRepository.getByID(parseInt(id)));
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    res.json(await locationsRepository.getByName(name));
  }
}

export default new locations();
