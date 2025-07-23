import fs from "fs/promises";
import path from "path";
import { Characters } from "../models/characters.model";

class characters {
  private dataPath = path.join(__dirname, "..", "data", "characters.json");
  private cache?: Characters[];
  private async readData(): Promise<Characters[]> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Characters[]> {
    const data = await this.readData();
    return data;
  }
  public async getByPageId(pageid: number): Promise<Characters | undefined> {
    const data = await this.readData();
    return data.find((character) => character.pageid === pageid);
  }
}

export default new characters();
