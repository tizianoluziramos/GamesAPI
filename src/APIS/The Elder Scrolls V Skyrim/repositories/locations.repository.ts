import fs from "fs/promises";
import path from "path";
import { ILocations, Location } from "../models/locations.model";

class locations {
  private dataPath = path.join(__dirname, "..", "data", "locations.json");
  private cache?: ILocations;

  private async readData(): Promise<ILocations> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    return result;
  }

  public async getAll(): Promise<ILocations> {
    const data = await this.readData();
    return data;
  }

  public async getLocations(): Promise<Location[]> {
    const data = await this.readData();
    return data.locations;
  }

  public async getImages(): Promise<ILocations["images"]> {
    const data = await this.readData();
    return data.images;
  }

  public async getExternalLinks(): Promise<ILocations["externallinks"]> {
    const data = await this.readData();
    return data.externallinks;
  }
}

export default new locations();
