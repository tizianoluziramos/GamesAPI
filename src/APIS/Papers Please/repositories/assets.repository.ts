import fs from "fs/promises";
import path from "path";
import { IAssets, Soundeffect } from "../models/Assets.model";

class assetsRepositories {
  private dataPath = path.join(__dirname, "..", "data", "assets.json");
  private cache?: IAssets;
  private async readData(): Promise<IAssets> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data) as IAssets;
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<IAssets> {
    return await this.readData();
  }

  public async getSoundEffects(id?: number, name?: string): Promise<Soundeffect[] | Soundeffect | undefined> {
    const data = await this.readData();
    if (!id && !name) {
      return data.soundeffects;
    } else if (id && !name) {
      return data.soundeffects.find((sound) => sound.id === id);
    } else if (!id && name) {
      return data.soundeffects.find((sound) => sound.name === name);
    } else if (id && name) {
      return data.soundeffects.find((sound) => sound.id === id && sound.name === name);
    }
  }

  public async getInGameFonts(): Promise<Base64URLString> {
    const data = await this.readData();
    return data["in-game-fonts"];
  }
}

export default new assetsRepositories();
