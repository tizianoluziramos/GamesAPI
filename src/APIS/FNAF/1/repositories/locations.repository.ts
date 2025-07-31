import fs from "fs/promises";
import path from "path";
import { Locations } from "../models/locations.model";

class locations {
  private cache?: Locations[];
  private dataPath: string = path.join(__dirname, "..", "data", "locations.json");
  private async readData(): Promise<Locations[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Locations[]> {
    return await this.readData();
  }

  public async getByID(id: number): Promise<Locations | undefined> {
    const data = await this.readData();
    return data.find((location) => location.id === id);
  }

  public async getByName(name: string): Promise<Locations | undefined> {
    const data = await this.readData();
    return data.find((location) => location.name === name);
  }
}

export default new locations();
