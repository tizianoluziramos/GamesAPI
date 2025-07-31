import fs from "fs/promises";
import path from "path";
import { Mechanics } from "../models/mechanics.model";

class mechanics {
  private dataPath: string = path.join(__dirname, "..", "data", "mechanics.json");
  private cache?: Mechanics[];

  private async readData(): Promise<Mechanics[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result: Mechanics[] = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Mechanics[]> {
    return await this.readData();
  }

  public async searchByName(name: string): Promise<Mechanics[] | undefined> {
    const data = (await this.readData()).filter((mechanic) =>
      mechanic.name.toLowerCase().includes(name.toLowerCase())
    );
    return data;
  }
}

export default new mechanics();
