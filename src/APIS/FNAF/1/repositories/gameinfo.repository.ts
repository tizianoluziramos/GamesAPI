import fs from "fs/promises";
import path from "path";
import { Gameinfo } from "../models/gameinfo.model";

class gameinfo {
  private cache?: Gameinfo;
  private dataPath: string = path.join(__dirname, "..", "data", "gameinfo.json");
  private async readData(): Promise<Gameinfo> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Gameinfo> {
    return await this.readData();
  }
}

export default new gameinfo();
