import * as fs from "fs/promises";
import { characters as ICharacters } from "../models/characters.model";
import path from "path";

class characters {
  private dataPath = path.join(__dirname, "..", "data", "characters.json");
  private cache?: ICharacters[];

  private async readData(): Promise<ICharacters[]> {
    if (this.cache) {
      return this.cache;
    }
    const data = await fs.readFile(this.dataPath, "utf-8");
    const result = JSON.parse(data);
    this.cache = result;
    return result;
  }
  public async getAll(): Promise<ICharacters[]> {
    const data = await this.readData();
    return data;
  }
  public async getByName(name: string): Promise<ICharacters | undefined> {
    const data = await this.readData();
    return data.find((character) => character.name === name);
  }
  public async getById(id: number): Promise<ICharacters | undefined> {
    const data = await this.readData();
    return data.find((character) => character.id === id);
  }
}

export default new characters();
