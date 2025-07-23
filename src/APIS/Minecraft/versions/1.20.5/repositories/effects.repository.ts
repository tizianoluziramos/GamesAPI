import fs from "fs/promises";
import path from "path";
import { Effects } from "../models/effects.model";

class effects {
  private dataPath = path.join(__dirname, "..", "data", "effects.json");
  private cache?: Effects[];

  private async readData(): Promise<Effects[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Effects[]> {
    return await this.readData();
  }
  public async getById(id: number): Promise<Effects | undefined> {
    const data = await this.readData();
    return data.find((effect) => effect.id === id);
  }
  public async getByName(name: string): Promise<Effects | undefined> {
    const data = await this.readData();
    return data.find((effect) => effect.name === name);
  }
  public async getByDisplayName(displayname: string): Promise<Effects | undefined> {
    const data = await this.readData();
    return data.find((effect) => effect.displayName === displayname);
  }
  public async filterByType(type: "bad" | "good"): Promise<Effects[] | undefined> {
    const data = await this.readData();
    return data.filter((effect) => effect.type === type);
  }
}

export default new effects();
