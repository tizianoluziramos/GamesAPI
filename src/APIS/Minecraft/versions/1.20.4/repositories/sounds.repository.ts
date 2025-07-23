import { Sounds } from "../models/sounds.model";
import fs from "fs/promises";
import path from "path";

class sounds {
  private dataPath = path.join(__dirname, "..", "data", "sounds.json");
  private cache?: Sounds[];

  private async readData(): Promise<Sounds[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Sounds[]> {
    return await this.readData();
  }

  public async getById(id: number): Promise<Sounds | undefined> {
    const data = await this.readData();
    return data.find((sound) => sound.id === id);
  }
  public async getByName(name: string): Promise<Sounds | undefined> {
    const data = await this.readData();
    return data.find((sound) => sound.name === name);
  }
}

export default new sounds();
