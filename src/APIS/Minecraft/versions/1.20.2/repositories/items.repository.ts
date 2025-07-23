import fs from "fs/promises";
import path from "path";
import { Items } from "../models/items.model";

class items {
  private dataPath = path.join(__dirname, "..", "data", "items.json");
  private cache?: Items[];
  private async readData(): Promise<Items[]> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Items[]> {
    return await this.readData();
  }
  public async getById(id: number): Promise<Items | undefined> {
    const data = await this.readData();
    return data.find((item) => item.id === id);
  }
  public async getByName(name: string): Promise<Items | undefined> {
    const data = await this.readData();
    return data.find((item) => item.name === name);
  }
  public async getByDisplayName(displayname: string): Promise<Items | undefined> {
    const data = await this.readData();
    return data.find((item) => item.displayName === displayname);
  }
  public async filterByStackSize(stackSize: 1 | 16 | 64): Promise<Items[] | undefined> {
    const data = await this.readData();
    return data.filter((item) => item.stackSize === stackSize);
  }
}

export default new items();
