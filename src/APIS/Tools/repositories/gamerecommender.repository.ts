import path from "path";
import fs from "fs/promises";
import { Game } from "../models/gamerecommender.model";

class gamerecommender {
  private dataPath: string = path.join(__dirname, "..", "data", "gamerecommender.json");
  private async readData(): Promise<Game[]> {
    const data = await fs.readFile(this.dataPath, "utf-8");
    return JSON.parse(data);
  }
  public async getAllGames(): Promise<Game[]> {
    const data = await this.readData();
    return data;
  }
  public async findByTitle(title: string): Promise<Game | null> {
    const games = await this.readData();
    const normalized = title.toLowerCase().replace(/[^a-z0-9]/g, "");
    return games.find((g) => g.title.toLowerCase().replace(/[^a-z0-9]/g, "") === normalized) || null;
  }
}

export default new gamerecommender();
