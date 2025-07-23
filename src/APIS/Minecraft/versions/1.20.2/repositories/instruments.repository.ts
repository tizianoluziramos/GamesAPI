import fs from "fs/promises";
import path from "path";
import { Instruments } from "../models/instruments.model";

class instruments {
  private dataPath = path.join(__dirname, "..", "data", "instruments.json");
  private cache?: Instruments[];
  private async readData(): Promise<Instruments[]> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Instruments[]> {
    return await this.readData();
  }
  public async getById(id: number): Promise<Instruments | undefined> {
    const data = await this.readData();
    return data.find((instrument) => instrument.id === id);
  }
  public async getByName(name: string): Promise<Instruments | undefined> {
    const data = await this.readData();
    return data.find((instrument) => instrument.name === name);
  }
}

export default new instruments();
