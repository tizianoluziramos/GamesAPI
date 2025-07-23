import fs from "fs/promises";
import path from "path";
import { ILore, ILoreSection } from "../models/Lore.model";

class LoreRepository {
  private dataPath = path.join(__dirname, "..", "data", "Lore.json");
  private cache?: ILore;

  private async readData(): Promise<ILore> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data) as ILore;
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<ILore> {
    return await this.readData();
  }

  public async getByLanguage(lang: string): Promise<ILore[string] | null> {
    const lore = await this.readData();
    if (lang in lore) {
      return lore[lang];
    }
    return null;
  }

  public async getSectionById(lang: string, id: number): Promise<ILoreSection | null> {
    const loreLang = await this.getByLanguage(lang);
    if (!loreLang) return null;
    const section = loreLang.secciones.find((s) => s.id === id);
    return section ?? null;
  }
}

export default new LoreRepository();
