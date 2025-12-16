import { Request, Response } from "express";
import languageRepository from "../../../../repositories/Minecraft/versions/1.21.1/language.repository";

class language {
  public async getAll(req: Request, res: Response) {
    res.json(await languageRepository.getAll());
  }
}

export default new language();
