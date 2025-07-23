import fs from "fs/promises";
import path from "path";
import { Weapons as IWeapons } from "../models/weapons.model";

class weapons {
  private dataPath = path.join(__dirname, "..", "data", "weapons.json");
  private cache?: IWeapons;

  private async readData(): Promise<IWeapons | undefined> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    this.cache = JSON.parse(data);
    return this.cache;
  }

  public async getAll(): Promise<IWeapons | undefined> {
    return await this.readData();
  }

  public async getByLanguage(lang: "spanish" | "english"): Promise<IWeapons["english"] | IWeapons["spanish"] | undefined> {
    const data = await this.readData();
    if (lang === "spanish") {
      return data?.spanish;
    }
    return data?.english;
  }

  public async getByName(lang: "spanish" | "english", name: string) {
    const data = await this.readData();
    if (lang === "english") {
      return data?.english.find((weapon) => weapon.Name === name);
    } else {
      return data?.spanish.find((weapon) => weapon.Name === name);
    }
  }
}

export default new weapons();
