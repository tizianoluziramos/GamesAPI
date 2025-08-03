import fs from "fs/promises";
import path from "path";
import { Items } from "../models/items.model";

class items {
  private cache?: Items;
  private dataPath: string = path.join(__dirname, "..", "data", "items.json");

  private async readData(): Promise<Items> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const parsed: Items = JSON.parse(data);
    this.cache = parsed;
    return parsed;
  }

  public async getAll(): Promise<Items> {
    return await this.readData();
  }

  public async searchByName(name: string): Promise<Items> {
    const data = await this.readData();

    const filterItems = (items: Items[keyof Items]) => items.filter((item) => item.title.toLowerCase().includes(name.toLowerCase()));

    return {
      armors: filterItems(data.armors),
      "Consumable items": filterItems(data["Consumable items"]),
      "Miscellaneous items": filterItems(data["Miscellaneous items"]),
      Weapons: filterItems(data.Weapons),
    };
  }
}

export default new items();
