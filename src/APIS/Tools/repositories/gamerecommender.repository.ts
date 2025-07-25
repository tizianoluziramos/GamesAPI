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
  public async findByTitle(title: string): Promise<Game | undefined> {
    const games = await this.readData();
    return games.find((g) => g.title.toLowerCase() === title.toLowerCase());
  }
}

export default new gamerecommender();
