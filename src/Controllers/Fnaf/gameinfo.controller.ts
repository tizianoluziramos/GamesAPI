import { Request, Response } from "express";
import gameinfoRepository from "../../repositories/Fnaf/gameinfo.repository";

class gameinfo {
  public async getAll(req: Request, res: Response) {
    res.json(await gameinfoRepository.getAll());
  }
}

export default new gameinfo();
