import fs from "fs/promises";
import path from "path";
import { Entities } from "../models/entities.model";

class entities {
  private dataPath = path.join(__dirname, "..", "data", "entities.json");
  private cache?: Entities[];
  private async readData(): Promise<Entities[]> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Entities[]> {
    return await this.readData();
  }
  public async getById(id: number): Promise<Entities | undefined> {
    const data = await this.readData();
    return data.find((entity) => entity.id === id);
  }
  public async getByInternalId(internalId: number): Promise<Entities | undefined> {
    const data = await this.readData();
    return data.find((entity) => entity.internalId === internalId);
  }
  public async getByName(name: string): Promise<Entities | undefined> {
    const data = await this.readData();
    return data.find((entity) => entity.name === name);
  }
  public async getByDisplayName(displayName: string): Promise<Entities | undefined> {
    const data = await this.readData();
    return data.find((entity) => entity.displayName === displayName);
  }
  public async filterByType(type: "ambient" | "animal" | "hostile" | "living" | "mob" | "other" | "passive" | "player" | "projectile" | "water_creature"): Promise<Entities[] | undefined> {
    const data = await this.readData();
    return data.filter((entity) => entity.type === type);
  }
  public async filterByCategory(category: "Hostile mobs" | "Immobile" | "Passive mobs" | "Projectiles" | "UNKNOWN" | "Vehicles"): Promise<Entities[] | undefined> {
    const data = await this.readData();
    return data.filter((entity) => entity.category === category);
  }
}

export default new entities();
