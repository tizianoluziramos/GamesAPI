import fs from "fs/promises";
import path from "path";
import { Locations, NewHome } from "../models/locations.model";

class locations {
  private cache?: Locations;
  private dataPath: string = path.join(__dirname, "..", "data", "locations.json");

  private async readData(): Promise<Locations> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  // ✅ Obtener todo el JSON
  public async getAll(): Promise<Locations> {
    return await this.readData();
  }

  // ✅ Obtener una categoría específica
  public async getCategory(name: keyof Locations): Promise<Locations[keyof Locations]> {
    const data = await this.readData();
    return data[name];
  }

  public async getAmalgamates(): Promise<NewHome[]> {
    const data = await this.readData();
    return data.hotland.amalgamates;
  }

  // ✅ Buscar por nombre (en todas las categorías)
  public async findByName(name: string): Promise<NewHome[]> {
    const data = await this.readData();
    const results: NewHome[] = [];

    for (const key of Object.keys(data) as (keyof Locations)[]) {
      if (key === "hotland") {
        results.push(...data.hotland.locations.filter((loc) => loc.title.toLowerCase().includes(name.toLowerCase())));
        results.push(...data.hotland.amalgamates.filter((loc) => loc.title.toLowerCase().includes(name.toLowerCase())));
      } else {
        results.push(...(data[key] as NewHome[]).filter((loc) => loc.title.toLowerCase().includes(name.toLowerCase())));
      }
    }

    return results;
  }

  // ✅ Buscar por pageid
  public async findById(id: number): Promise<NewHome | undefined> {
    const data = await this.readData();

    for (const key of Object.keys(data) as (keyof Locations)[]) {
      if (key === "hotland") {
        const found = data.hotland.locations.find((loc) => loc.pageid === id) || data.hotland.amalgamates.find((loc) => loc.pageid === id);
        if (found) return found;
      } else {
        const found = (data[key] as NewHome[]).find((loc) => loc.pageid === id);
        if (found) return found;
      }
    }

    return undefined;
  }
}

export default new locations();
