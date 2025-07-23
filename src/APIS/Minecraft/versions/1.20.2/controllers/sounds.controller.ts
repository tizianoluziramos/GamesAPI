import { Request, Response } from "express";
import soundsRepositories from "../repositories/sounds.repository";

class sounds {
  public async getAll(req: Request, res: Response) {
    const data = await soundsRepositories.getAll();
    res.json(data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;
    const sound = await soundsRepositories.getById(Number(id));

    if (!sound) {
      res.status(404).json({ message: "Sound not found" });
      return;
    }

    res.json(sound);
  }

  public async getByName(req: Request, res: Response) {
    const { name } = req.params;
    const sound = await soundsRepositories.getByName(name);

    if (!sound) {
      res.status(404).json({ message: "Sound not found" });
      return;
    }

    res.json(sound);
  }
}

export default new sounds();
