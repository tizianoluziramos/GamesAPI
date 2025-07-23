import fs from "fs/promises";
import path from "path";
import { Foods } from "../models/foods.model";

class foods {
  private cache?: Foods[];
  private dataPath = path.join(__dirname, "..", "data", "foods.json");
  private async readData(): Promise<Foods[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Foods[]> {
    return await this.readData();
  }
  public async getById(id: number): Promise<Foods | undefined> {
    const data = await this.readData();
    return data.find((food) => food.id === id);
  }
  public async getByName(name: string): Promise<Foods | undefined> {
    const data = await this.readData();
    return data.find((food) => food.name === name);
  }
  public async getByDisplayName(displayname: string): Promise<Foods | undefined> {
    const data = await this.readData();
    return data.find((food) => food.displayName === displayname);
  }
  public async filterByStackSize(stacksize: 1 | 16 | 64): Promise<Foods[] | undefined> {
    const data = await this.readData();
    return data.filter((food) => food.stackSize === stacksize);
  }
}

export default new foods();
