import fs from "fs/promises";
import path from "path";
import { Enchantments } from "../models/enchantments.model";

class enchantments {
  private cache?: Enchantments[];
  private dataPath = path.join(__dirname, "..", "data", "enchantments.json");
  private async readData(): Promise<Enchantments[]> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<Enchantments[]> {
    return await this.readData();
  }
  public async getById(id: number): Promise<Enchantments | undefined> {
    const data = await this.readData();
    return data.find((enchantment) => enchantment.id === id);
  }
  public async getByName(name: string): Promise<Enchantments | undefined> {
    const data = await this.readData();
    return data.find((enchantment) => enchantment.name === name);
  }
  public async getByDisplayName(display_name: string): Promise<Enchantments | undefined> {
    const data = await this.readData();
    return data.find((enchantment) => enchantment.displayName === display_name);
  }
  public async filterByMaxLevel(max_level: number): Promise<Enchantments[] | undefined> {
    const data = await this.readData();
    return data.filter((enchantment) => enchantment.maxLevel === max_level);
  }
  public async filterByTreasureOnly(treasureonly: boolean): Promise<Enchantments[] | undefined> {
    const data = await this.readData();
    return data.filter((enchantment) => enchantment.treasureOnly === treasureonly);
  }
  public async filterByCurse(curse: boolean): Promise<Enchantments[] | undefined> {
    const data = await this.readData();
    return data.filter((enchantment) => enchantment.curse === curse);
  }
  public async filterByCategory(category: string): Promise<Enchantments[] | undefined> {
    const data = await this.readData();
    return data.filter((enchantment) => enchantment.category === category);
  }
  public async filterByWeight(weight: number): Promise<Enchantments[] | undefined> {
    const data = await this.readData();
    return data.filter((enchantment) => enchantment.weight === weight);
  }
  public async filterByTradeable(tradeable: boolean): Promise<Enchantments[] | undefined> {
    const data = await this.readData();
    return data.filter((enchantment) => enchantment.tradeable === tradeable);
  }
  public async filterByDiscoverable(discoverable: boolean): Promise<Enchantments[] | undefined> {
    const data = await this.readData();
    return data.filter((enchantment) => enchantment.discoverable === discoverable);
  }
}

export default new enchantments();
