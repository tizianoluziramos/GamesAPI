import fs from "fs/promises";
import path from "path";
import { Characters } from "models/Fnaf/characters.model";

class CharactersRepository {
  private cache?: Characters[];
  private filePath = path.join(__dirname, "..", "..", "data", "fnaf1", "characters.json");

  private async readData(): Promise<Characters[] | undefined> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.filePath, "utf-8");
    this.cache = JSON.parse(data) || [];
    return this.cache;
  }

  public async getAll(): Promise<Characters[] | undefined> {
    return this.readData();
  }

  public async getByID(id: number): Promise<Characters | undefined> {
    const chars = await this.readData();
    return chars?.find(c => c.id === id);
  }

  public async searchByName(name: string): Promise<Characters[] | undefined> {
    const chars = await this.readData();
    return chars?.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
  }
}

export default new CharactersRepository();
