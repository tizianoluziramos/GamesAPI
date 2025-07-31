import { Request, Response } from "express";
import gamedatabaseRepository from "../repositories/gamedatabase.repository";

class gamedatabase {
  public async getAll(req: Request, res: Response) {
    const page = Number(req.query.page);
    const pageSize = Number(req.query.pagesize);

    if (!page || !pageSize || isNaN(page) || isNaN(pageSize)) {
      return res.status(400).json({ error: "Query Params page and pageSize are required and must be numbers." });
    }

    try {
      const games = await gamedatabaseRepository.getAll(page, pageSize);
      res.json(games);
    } catch (error) {
      res.status(500).json({ error: "Error loading games." });
    }
  }

  public async searchByName(req: Request, res: Response) {
    const name = req.params.name as string | undefined;

    if (!name || name.trim().length === 0) {
      return res.status(400).json({ error: "Parameter 'name' is required" });
    }

    try {
      const results = await gamedatabaseRepository.searchByName(name);
      return res.json(results);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public async getTotalGames(req: Request, res: Response) {
    try {
      const total = await gamedatabaseRepository.totalGamesLength();
      return res.json({ total });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  public async getBySid(req: Request, res: Response) {
    const sid = Number(req.params.sid);

    if (isNaN(sid)) {
      return res.status(400).json({ error: "Invalid sid parameter" });
    }

    try {
      const game = await gamedatabaseRepository.getBySid(sid);

      if (!game) {
        return res.status(404).json({ error: "Game not found" });
      }

      return res.json(game);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new gamedatabase();
