import fs from "fs/promises";
import path from "path";
import { Gameinfo } from "models/Fnaf/gameinfo.model";

class GameinfoRepository {
  private cache?: Gameinfo;
  private filePath = path.join(__dirname, "..", "..", "data", "fnaf1", "gameinfo.json");

  private async readFile(): Promise<Gameinfo | undefined> {
    if (this.cache) return this.cache;
    const data = await fs.readFile(this.filePath, "utf-8");
    this.cache = JSON.parse(data) || ({} as Gameinfo);
    return this.cache;
  }

  public async getAll(): Promise<Gameinfo | undefined> {
    return this.readFile();
  }
}

export default new GameinfoRepository();
