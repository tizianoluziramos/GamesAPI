import fs from "fs/promises";
import path from "path";
import { Attributes } from "../models/attributes.model";

class attributes {
  private cache?: Attributes[];
  private dataPath = path.join(__dirname, "..", "data", "attributes.json");
  private async readData(): Promise<Attributes[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Attributes[]> {
    return await this.readData();
  }
  public async getByName(name: string): Promise<Attributes | undefined> {
    const data = await this.readData();
    return data.find((attribute: Attributes) => attribute.name === name);
  }
  public async getByResource(resource: string): Promise<Attributes | undefined> {
    const data = await this.readData();
    return data.find((attribute: Attributes) => attribute.resource === resource);
  }
  public async filterByMax(max: number): Promise<Attributes[] | undefined> {
    const data = await this.readData();
    return data.filter((attribute) => attribute.max === max);
  }
  public async filterByDefault(a: number): Promise<Attributes[] | undefined> {
    const data = await this.readData();
    return data.filter((attribute) => attribute.default === a);
  }
}

export default new attributes();
