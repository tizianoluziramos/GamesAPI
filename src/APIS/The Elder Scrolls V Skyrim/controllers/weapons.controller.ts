import { Request, Response } from "express";
import weaponsRepository from "../repositories/weapons.repository";

class weapons {
  public async getAll(req: Request, res: Response) {
    const data = await weaponsRepository.getAll();
    res.json(data);
  }

  public async getByLanguage(req: Request, res: Response) {
    const { language } = req.params;
    const data = await weaponsRepository.getByLanguage(language as "english" | "spanish");
    res.json(data);
  }

  public async getByName(req: Request, res: Response) {
    const { language, name } = req.params;
    const data = await weaponsRepository.getByName(language as "english" | "spanish", name);
    res.json(data);
  }
}

export default new weapons();
