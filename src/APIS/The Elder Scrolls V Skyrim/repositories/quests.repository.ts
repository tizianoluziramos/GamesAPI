import fs from "fs/promises";
import path from "path";
import { Quests } from "../models/quests.model";

class quests {
  private cache?: Quests[];
  private dataPath = path.join(__dirname, "..", "data", "quests.json");
  private async readData(): Promise<Quests[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Quests[]> {
    const data = await this.readData();
    return data;
  }

  public async getByName(name: string): Promise<Quests | undefined> {
    const data = await this.readData();
    return data.find((quest) => quest.Name === name);
  }
  public async filterByLocation(location: string): Promise<Quests[] | undefined> {
    const data = await this.readData();
    return data.filter((quest) => quest.Location === location);
  }
  public async filterByHold(hold: string): Promise<Quests[] | undefined> {
    const data = await this.readData();
    return data.filter((quest) => quest.Hold === hold);
  }
}

export default new quests();
