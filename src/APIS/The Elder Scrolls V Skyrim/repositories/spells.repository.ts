import fs from "fs/promises";
import path from "path";
import { School, Spells } from "../models/spells.model";

class spells {
  private cache?: Spells[];
  private dataPath: string = path.join(__dirname, "..", "data", "spells.json");
  private async readData(): Promise<Spells[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Spells[]> {
    return await this.readData();
  }

  public async getByName(name: string): Promise<Spells | undefined> {
    const data = await this.readData();
    return data.find((spell) => spell.name === name);
  }

  public async filterBySchool(school: School): Promise<Spells[] | undefined> {
    const data = await this.readData();
    return data.filter((spell) => spell.school === school);
  }
}

export default new spells();
