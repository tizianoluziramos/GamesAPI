import fs from "fs/promises";
import path from "path";
import { Characters } from "../models/characters.model";

class characters {
  private dataPath: string = path.join(__dirname, "..", "data", "characters.json");
  private cache?: Characters[];
  private async readData(): Promise<Characters[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Characters[]> {
    return await this.readData();
  }

  public async getByID(id: number): Promise<Characters | undefined> {
    const data = await this.readData();
    return data.find((character) => character.id === id);
  }

  public async searchByName(name: string): Promise<Characters[] | Characters | undefined> {
    const data = await this.readData();
    if (name.length === 0) return data;
    return data.filter((character) => character.name.toLowerCase().includes(name.toLowerCase()));
  }
}

export default new characters();
