import fs from "fs/promises";
import path from "path";
import { Particles } from "../models/particles.model";

class particles {
  private dataPath = path.join(__dirname, "..", "data", "particles.json");
  private cache?: Particles[];
  private async readData(): Promise<Particles[]> {
    if (this.cache) return this.cache;

    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Particles[]> {
    return await this.readData();
  }
  public async getById(id: number): Promise<Particles | undefined> {
    const data = await this.readData();
    return data.find((particle) => particle.id === id);
  }
  public async getByName(name: string): Promise<Particles | undefined> {
    const data = await this.readData();
    return data.find((particle) => particle.name === name);
  }
}

export default new particles();
