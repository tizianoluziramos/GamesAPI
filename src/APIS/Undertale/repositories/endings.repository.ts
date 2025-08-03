import fs from "fs/promises";
import path from "path";
import { Endings } from "../models/endings.model";

class endings {
  private cache?: Endings;
  private dataPath: string = path.join(__dirname, "..", "data", "endings.json");
  private async readData(): Promise<Endings> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Endings> {
    return await this.readData();
  }

  public async getBranches(): Promise<Endings["branches"]> {
    return (await this.readData()).branches;
  }

  public async getNeutralRoutes(): Promise<Endings["neutral_routes"]> {
    return (await this.readData()).neutral_routes;
  }

  public async getNeutralEndings(): Promise<Endings["neutral_endings"]> {
    return (await this.readData()).neutral_endings;
  }
}

export default new endings();
