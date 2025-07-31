import { Request, Response } from "express";
import Gameinfo from "../repositories/gameinfo.repository";

class GameinfoController {
  public async getAll(req: Request, res: Response) {
    try {
      const data = await Gameinfo.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener la información del juego" });
    }
  }

  public async getPlatforms(req: Request, res: Response) {
    try {
      const data = await Gameinfo.getPlatforms();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener las plataformas" });
    }
  }

  public async getModes(req: Request, res: Response) {
    try {
      const data = await Gameinfo.getModes();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener los modos de juego" });
    }
  }

  public async getLanguages(req: Request, res: Response) {
    try {
      const data = await Gameinfo.getLanguages();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: "Error al obtener los idiomas" });
    }
  }
}

export default new GameinfoController();
