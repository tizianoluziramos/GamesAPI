import { Request, Response } from "express";
import onlineStatsRepositories from "../repositories/online_stats.repository";

class OnlineStatsController {
  public async showStores(req: Request, res: Response) {
    res.json({ routes: ["Steam"] });
  }
  public async showOptions(req: Request, res: Response) {
    res.json({
      routes: ["online_players", "Archivements"],
    });
  }
  public async getSteamArchivenments(req: Request, res: Response) {
    const data = await onlineStatsRepositories.getGlobalSteamAchievements();
    res.json(data);
  }
  public async getActivePlayers(req: Request, res: Response) {
    try {
      const params = req.params.game;
      if (params.length === 0) {
        res.json({ message: 'Param "game", is required.' });
      }
      if (params === "Steam") {
        const data = await onlineStatsRepositories.getActiveSteamPlayers();
        res.status(200).json(data);
      }
    } catch (error) {
      console.error("Error en controlador:", error);
      res.status(500).json({ error: "Error al actualizar o leer datos" });
    }
  }
}

export default new OnlineStatsController();
