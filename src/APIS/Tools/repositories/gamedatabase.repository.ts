import fs from "fs/promises";
import path from "path";
import { Gamedatabase } from "../models/gamedatabase.model";

class GameDatabaseRepository {
  private dataPath: string = path.join(__dirname, "..", "data", "gamedatabase.json");
  private cache: Gamedatabase[] | null = null;

  private async loadData(): Promise<Gamedatabase[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    this.cache = JSON.parse(data) as Gamedatabase[];
    return this.cache;
  }

  public async getAll(page: number, pageSize: number): Promise<Gamedatabase[] | string> {
    if (page < 1) return "Page must be more than 0";
    if (pageSize < 1 || pageSize > 100) return "Page size minimium: 1, maximium: 100";

    const allGames = await this.loadData();
    const startIndex = (page - 1) * pageSize;
    return allGames.slice(startIndex, startIndex + pageSize);
  }

  public async getBySid(sid: number): Promise<Gamedatabase | undefined> {
    return (await this.loadData()).find((game) => game.sid === sid);
  }

  public async searchByName(name: string): Promise<Gamedatabase[]> {
    const data = await this.loadData();

    return data.filter((game) => game.name && game.name.toString().toLowerCase().includes(name.toLowerCase()));
  }

  public async totalGamesLength(): Promise<number> {
    return (await this.loadData()).length;
  }
}

export default new GameDatabaseRepository();
