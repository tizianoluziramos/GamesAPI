import fs from "fs/promises";
import path from "path";
import { Characters } from "../models/characters.model";

class characters {
  private cache?: Characters;
  private dataPath: string = path.join(__dirname, "..", "data", "characters.json");
  private async readData(): Promise<Characters> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }

  public async getAll(): Promise<Characters> {
    return await this.readData();
  }

  public async getByType(type: "enemies" | "maincharacters" | "npcs"): Promise<Characters["enemies"] | Characters["maincharacters"] | Characters["npcs"] | Characters> {
    if (type === "enemies") {
      return (await this.readData()).enemies;
    }
    if (type === "maincharacters") {
      return (await this.readData()).maincharacters;
    }
    if (type === "npcs") {
      return (await this.readData()).npcs;
    }
    return await this.readData();
  }
}

export default new characters();
