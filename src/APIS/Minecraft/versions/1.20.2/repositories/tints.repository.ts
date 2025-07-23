import { Tints } from "../models/tints.model";
import fs from "fs/promises";
import path from "path";

class tints {
  private dataPath = path.join(__dirname, "..", "data", "tints.json");
  private cache?: Tints;

  private async readData(): Promise<Tints> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Tints> {
    return await this.readData();
  }

  public async getConstant(): Promise<Tints["constant"]> {
    const data = await this.readData();
    return data.constant;
  }
  public async getFoliage(): Promise<Tints["foliage"]> {
    const data = await this.readData();
    return data.foliage;
  }
  public async getGrass(): Promise<Tints["grass"]> {
    const data = await this.readData();
    return data.grass;
  }
  public async getRedstone(): Promise<Tints["redstone"]> {
    const data = await this.readData();
    return data.redstone;
  }
  public async getWater(): Promise<Tints["water"]> {
    const data = await this.readData();
    return data.water;
  }
}

export default new tints();
