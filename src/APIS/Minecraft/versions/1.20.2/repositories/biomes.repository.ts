import fs from "fs/promises";
import path from "path";
import { Biomes } from "../models/biomes.model";

class biomes {
  private dataPath = path.join(__dirname, "..", "data", "biomes.json");
  private cache?: Biomes[];
  private async readData(): Promise<Biomes[]> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Biomes[]> {
    return await this.readData();
  }
  public async getById(id: number): Promise<Biomes | undefined> {
    const data = await this.readData();
    return data.find((biome) => biome.id === id);
  }
  public async getByName(name: string): Promise<Biomes | undefined> {
    const data = await this.readData();
    return data.find((biome) => biome.name === name);
  }
  public async getByDisplayName(displayName: string): Promise<Biomes | undefined> {
    const data = await this.readData();
    return data.find((biome) => biome.displayName === displayName);
  }
  public async filterByCategory(category: string): Promise<Biomes[] | undefined> {
    const data = await this.readData();
    return data.filter((biome) => biome.category === category);
  }
  public async filterByTemperature(temperature: number): Promise<Biomes[] | undefined> {
    const data = await this.readData();
    return data.filter((biome) => biome.temperature === temperature);
  }
  public async filterByPrecipitation(precipitation: boolean): Promise<Biomes[] | undefined> {
    const data = await this.readData();
    return data.filter((biome) => biome.has_precipitation === precipitation);
  }
  public async filterByDimension(dimension: string): Promise<Biomes[] | undefined> {
    const data = await this.readData();
    return data.filter((biome) => biome.dimension === dimension);
  }
  public async filterByColor(color: number): Promise<Biomes[] | undefined> {
    const data = await this.readData();
    return data.filter((biome) => biome.color === color);
  }
}

export default new biomes();
