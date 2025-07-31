import fs from "fs/promises";
import path from "path";
import { Gameinfo as gameinfo } from "../models/gameinfo.model";

class Gameinfo {
  private dataPath: string = path.join(__dirname, "..", "data", "gameinfo.json");
  private cache?: gameinfo;
  private async readData(): Promise<gameinfo> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<gameinfo> {
    const data = await this.readData();
    return data;
  }
  public async getPlatforms(): Promise<string[]> {
    const data = await this.readData();
    return data.platforms;
  }
  public async getModes(): Promise<string[]> {
    const data = await this.readData();
    return data.modes;
  }
  public async getLanguages(): Promise<string[]> {
    const data = await this.readData();
    return data.languages;
  }
}

export default new Gameinfo();
