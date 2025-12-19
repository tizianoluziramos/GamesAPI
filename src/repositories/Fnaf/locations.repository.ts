import fs from "fs/promises";
import path from "path";
import { Locations } from "models/Fnaf/locations.model";

class LocationsRepository {
  private cache?: Locations[];
  private filePath = path.join(__dirname, "..", "..", "data", "fnaf1", "locations.json");

  private async readFile(): Promise<Locations[] | undefined> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.filePath, "utf-8");
    this.cache = JSON.parse(data) || [];
    return this.cache;
  }

  public async getAll(): Promise<Locations[] | undefined> {
    return this.readFile();
  }

  public async getByID(id: number): Promise<Locations | undefined> {
    const locs = await this.readFile();
    return locs?.find(l => l.id === id);
  }

  public async getByName(name: string): Promise<Locations | undefined> {
    const locs = await this.readFile();
    return locs?.find(l => l.name === name);
  }
}

export default new LocationsRepository();
